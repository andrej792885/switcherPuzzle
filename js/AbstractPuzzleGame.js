/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    const AbstractPuzzleGame = function(gameName,numOfLevels,main){
        this.Container_constructor();
        this.init(gameName,numOfLevels,main);
    };

    const p = createjs.extend(AbstractPuzzleGame, createjs.Container);

    p.mainGame = null;
    p.gameName = null;
    p.numberOfLevels = 0;
    p.board = null;
    p.level = 0;
    p.levelsOptions = null;
    p.levelsBtns = null;
    p.framesBtn = null;
    p.backBtn = null;
    p.solveBtn = null;
    p.solvedSticker = null;
    p.solvedImage = null;
    p.showImageBtn = null;
    p._puzzleIsLoaded = false;
    p._hasBoardFrame = false;
    p._playerSawImage = false;
    p.paginationComponent = null;
    p.solveCreditsComponent = null;
    p.timer = null;


    p.init = function (gameName,numOfLevels,main) {
        this.mainGame = main;
        this.gameName = gameName;
        this.numberOfLevels = numOfLevels;
        const levelOptions = gameName + "LevelOptions";
        this.levelsOptions = new system[levelOptions](); // todo NE BI TREBALO DA SE INSTANCIRA SVAKI PUT NOVA KLASA

        const framesBtn = this.framesBtn = new system.ShapeButton(87,33,6,"#73d0fc");
        framesBtn.x = 51;
        framesBtn.y = 60;
        framesBtn.addText("FRAMES","19px Russo One","#44484f",0,24);
        framesBtn.on("click",(event)=>{
            framesBtn.doClickAnimation();
            this.board.showHideFrames();
        });

        const showImageBtn = this.showImageBtn = new system.ShapeButton(87,33,6,"#73d0fc");
        showImageBtn.x = 51;
        showImageBtn.y = 114;
        showImageBtn.addText("IMAGE","20px Russo One","#44484f",0,24);
        showImageBtn.on("click",(event)=>{
            showImageBtn.doClickAnimation();
            this.onShowImageBtn();
        });

        const solveBtn = this.solveBtn = new system.ShapeButton(100,40,6,"#fc5c61");
        solveBtn.x = 1228;
        solveBtn.y = 675;
        solveBtn.addText("SOLVE","24px Russo One","#ffe2e9",0,30);
        solveBtn.on("click",(event)=>{
            solveBtn.doClickAnimation();
            this.solveCreditsComponent.numOfCredits--;
            this.solveCreditsComponent.updateCreditsTxt();
            this.board.solvePuzzle();
        });

        const solveCreditsComponent = this.solveCreditsComponent = new system.SolveCreditsComponent(this);
        solveCreditsComponent.x = 442;
        solveCreditsComponent.y = 677;

        const img = system.CustomMethods.makeImage("backBtn" , true);
        const backBtn = this.backBtn = new system.ImageButton(img);
        backBtn.x = 42;
        backBtn.y = 643;
        backBtn.on("click",(event)=>{
            this.onBackBtn();
        });

        const pages = Math.ceil(this.numberOfLevels/6); // 6 = buttons per page
        const pagination = this.paginationComponent = new system.PaginationComponent(pages,this);
        pagination.x = 536;
        pagination.y = 7;

        const timer = this.timer = new system.Timer();
        timer.x = 1210;
        timer.y = 36;

        this.addChild(framesBtn,solveBtn,showImageBtn,backBtn,pagination,solveCreditsComponent,timer);

        this.addLevelsButtons(0,6);
        this.checkSolvedLevels();
        this.showInGameButtons(false);
        this.addBoard();
    };

    p.addBoard = function(){
        const board = this.board = new system.SwitcherBoard(this);
        this.addChild(board);

        const solvedImage = this.solvedImage = system.CustomMethods.makeImage("switcher" , false);
        solvedImage.visible = false;
        this.addChild(solvedImage);

        const solvedSticker = this.solvedSticker = system.CustomMethods.makeImage("solved" , false); // just small stick for animation
        solvedSticker.regX = solvedSticker.image.width/2;
        solvedSticker.regY = solvedSticker.image.height/2;
        solvedSticker.visible = false;
        this.addChild(solvedSticker);
    };

    p.hideBoard = function () {
        this.board.visible = this.solvedImage.visible = this.solvedSticker.visible = false;
    };

    p.loadLevel = function () {
        const boardOptions = this.levelsOptions.getOptionsForLevel(this.level);
        this.board.setBoard(boardOptions);
        this.centerBoard();
        this.board.visible = true;

        this.showInGameButtons(true);
        this._puzzleIsLoaded = true;

        system.CustomMethods.swapImages(this.solvedImage , this.board.mainImage);
        this.solvedImage.x = this.board.x;
        this.solvedImage.y = -(this.solvedImage.image.height);

        this.solveBtn.enableClick(this.mainGame.player.solveCredits > 0);

        this.timer.startTimer();
    };

    p.onBackBtn = function () {
        if(this._puzzleIsLoaded){
            this.timer.stopTimer();
            this.timer.reset();
            this.board.removeFields();
            this.hideBoard();
            this.levelsBtns.visible = true;
            this.showInGameButtons(false);
            this._puzzleIsLoaded = false;
            this._playerSawImage = false;
            if(this._hasBoardFrame){
                this.removeChildAt(0);
            }
            if(this.solvedSticker.visible){
                this.solvedSticker.visible = false;
            }
            this.checkSolvedLevels();
        }else{
            this.parent.showMainGameComponents(true);
        }
    };

    p.checkSolvedLevels = function () {
        for(let i = 0; i < this.levelsBtns.numChildren; i++){
            const button = this.levelsBtns.getChildAt(i);
            const arrToCheck = this.gameName.toLowerCase() + "PuzzleSolvedLevels";
            if(this.mainGame.player[arrToCheck].hasOwnProperty(button.name)){
                button.showSticker(true);
                button.updateBestTimeTxt(this.timer.formatTime(this.mainGame.player[arrToCheck][button.name]));
            }else{
                button.updateBestTimeTxt("");
            }
        }
    };

    p.levelSolved = function () {
        this.timer.stopTimer();
        this.solveBtn.enableClick(false);
        this.framesBtn.enableClick(false);
        this.showSolvedAnimation();

        if(!this.levelsBtns.getChildByName(this.level).hasSticker){ // samo u slucaju da nije predjen nivo moze da dobije povecanje solve bar-a
            this.solveCreditsComponent.levelSolved();
        }

        this.mainGame.updatePlayer(); // ovaj poziv je potreban za slucaj da ima bolje vreme
    };

    // method with functionality of continious viewing solved image
/*    p.onShowImageBtn = function () {
        this.showImageBtn.enableClick(false);
        var that = this;
        var yPos = this.solvedImage.y === this.board.y ? -(this.solvedImage.image.height) : this.board.y;
        var isVisible = yPos > 0;
        this.solvedImage.visible = true;
        createjs.Tween.get(this.solvedImage).to({y:yPos},500,createjs.Ease.getPowInOut(2)).call(function () {
            that.solvedImage.visible = isVisible;
            that.showImageBtn.enableClick(true);
        });
    };*/

    // method with functionality of just once viewing solved image
    p.onShowImageBtn = function () {
        this.showImageBtn.enableClick(false);
        const yPos = this.solvedImage.y === this.board.y ? -(this.solvedImage.image.height) : this.board.y;
        const isVisible = yPos > 0;
        this.solvedImage.visible = true;
        createjs.Tween.get(this.solvedImage).to({y:yPos},500,createjs.Ease.getPowInOut(2)).call(()=> {
            this.solvedImage.visible = isVisible;
            this.showImageBtn.visible = !this._playerSawImage;// player should see image just one time
            this.showImageBtn.enableClick(true);
            this._playerSawImage = true;
        });
    };

    p.showInGameButtons = function (bool) {
        this.framesBtn.visible =
        this.solveBtn.visible =
        this.showImageBtn.visible =
        this.solveCreditsComponent.visible = bool;

        this.paginationComponent.visible = !bool;
    };

    p.showSolvedAnimation = function () {
        this.solvedSticker.scaleX = this.solvedSticker.scaleY = 1;
        this.solvedSticker.x = this.board.x + this.board.getBoardWidth();
        this.solvedSticker.y = this.board.y;
        this.solvedSticker.visible = true;
        createjs.Tween.get(this.solvedSticker).to({scaleX:0.5,scaleY:0.5},500,createjs.Ease.getPowIn(3));
    };

    p.centerBoard = function () {
        this.board.x = (system.MainGame.GAME_WIDTH/2) - (this.board.getBoardWidth()/2);
        this.board.y = (system.MainGame.GAME_HEIGHT/2) - (this.board.getBoardHeight()/2) - 10;
    };

    p.resetLevelsButtons = function (from,to) { // added for pagination
        this.refreshLevelsButtons(from,to);
    };

    system.AbstractPuzzleGame = createjs.promote(AbstractPuzzleGame,"Container");

})();