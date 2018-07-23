/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    var AbstractPuzzleGame = function(gameName,numOfLevels,main){
        this.Container_constructor();
        this.init(gameName,numOfLevels,main);
    };

    var p = createjs.extend(AbstractPuzzleGame, createjs.Container);

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
        var that = this;
        this.gameName = gameName;
        this.numberOfLevels = numOfLevels;
        var levelOptions = gameName + "LevelOptions";
        this.levelsOptions = new system[levelOptions](); // todo NE BI TREBALO DA SE INSTANCIRA SVAKI PUT NOVA KLASA

        var framesBtn = this.framesBtn = new system.ShapeButton(87,33,6,"#73d0fc");
        framesBtn.x = 51;
        framesBtn.y = 60;
        framesBtn.addText("FRAMES","19px Russo One","#44484f",0,24);
        framesBtn.on("click",function(event){
            framesBtn.doClickAnimation();
            that.board.showHideFrames();
        });

        var showImageBtn = this.showImageBtn = new system.ShapeButton(87,33,6,"#73d0fc");
        showImageBtn.x = 51;
        showImageBtn.y = 114;
        showImageBtn.addText("IMAGE","20px Russo One","#44484f",0,24);
        showImageBtn.on("click",function(event){
            showImageBtn.doClickAnimation();
            that.onShowImageBtn();
        });

        var solveBtn = this.solveBtn = new system.ShapeButton(100,40,6,"#fc5c61");
        solveBtn.x = 1228;
        solveBtn.y = 675;
        solveBtn.addText("SOLVE","24px Russo One","#ffe2e9",0,30);
        solveBtn.on("click",function(event){
            solveBtn.doClickAnimation();
            that.solveCreditsComponent.numOfCredits--;
            that.solveCreditsComponent.updateCreditsTxt();
            that.board.solvePuzzle();
        });
        
        var solveCreditsComponent = this.solveCreditsComponent = new system.SolveCreditsComponent(this);
        solveCreditsComponent.x = 442;
        solveCreditsComponent.y = 677;

        var img = system.CustomMethods.makeImage("backBtn" , true);
        var backBtn = this.backBtn = new system.ImageButton(img);
        backBtn.x = 42;
        backBtn.y = 643;
        backBtn.on("click",function(event){
            that.onBackBtn();
        });

        var pages = this.numberOfLevels/6;
        var pagination = this.paginationComponent = new system.PaginationComponent(pages,this);
        pagination.x = 536;
        pagination.y = 7;

        var timer = this.timer = new system.Timer();
        timer.x = 1210;
        timer.y = 36;

        this.addChild(framesBtn,solveBtn,showImageBtn,backBtn,pagination,solveCreditsComponent,timer);

        this.addLevelsButtons(0,6);
        this.checkSolvedLevels();
        this.showInGameButtons(false);
    };

    p.onBackBtn = function () {
        if(this._puzzleIsLoaded){
            this.timer.stopTimer();
            this.timer.reset();
            this.board.removeFields();
            this.removeBoard();
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
            this.parent.removeGame();
        }
    };

    p.checkSolvedLevels = function () {
        for(var i = 0; i < this.levelsBtns.numChildren; i++){
            var button = this.levelsBtns.getChildAt(i);
            var arrToCheck = this.gameName.toLowerCase() + "PuzzleSolvedLevels";
            if(this.mainGame.player[arrToCheck].hasOwnProperty(button.name)){
                if(!button.hasSticker){
                    button.addSticker();
                    button.addBestTime(this.timer.formatTime(this.mainGame.player[arrToCheck][button.name]));
                }else{
                    button.updateBestTimeTxt(this.timer.formatTime(this.mainGame.player[arrToCheck][button.name]));
                }
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
        var that = this;
        var yPos = this.solvedImage.y === this.board.y ? -(this.solvedImage.image.height) : this.board.y;
        var isVisible = yPos > 0;
        this.solvedImage.visible = true;
        createjs.Tween.get(this.solvedImage).to({y:yPos},500,createjs.Ease.getPowInOut(2)).call(function () {
            that.solvedImage.visible = isVisible;
            that.showImageBtn.visible = !that._playerSawImage;// player should see image just one time
            that.showImageBtn.enableClick(true);
            that._playerSawImage = true;
        });
    };

    p.showInGameButtons = function (bool) {
        this.framesBtn.visible =
        this.solveBtn.visible =
        this.showImageBtn.visible =
        this.solveCreditsComponent.visible = bool;

        this.paginationComponent.visible = !bool;
    };

    p.removeBoard = function () {
        this.removeChild(this.board,this.solvedImage,this.solvedSticker);
    };

    p.loadLevel = function (gameName) {
        var boardOptions = this.levelsOptions.getOptionsForLevel(this.level);

        var gameBoard = gameName + "Board";
        var board = this.board = new system[gameBoard](boardOptions,this);
        this.centerBoard();
        this.addChild(board);
        this.showInGameButtons(true);
        this._puzzleIsLoaded = true;

        var solvedImage = this.solvedImage = system.CustomMethods.makeImage(board.mainImage , false);
        solvedImage.x = board.x;
        solvedImage.y = -(solvedImage.image.height);
        this.addChild(solvedImage);

        var solvedSticker = this.solvedSticker = system.CustomMethods.makeImage("solved" , false); // just small stick for animation
        solvedSticker.regX = solvedSticker.image.width/2;
        solvedSticker.regY = solvedSticker.image.height/2;
        solvedSticker.mouseEnabled = false;
        solvedSticker.visible = false;
        this.addChild(solvedSticker);

        this.solveBtn.enableClick(this.mainGame.player.solveCredits > 0);

        this.timer.startTimer();
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

    p.destroyGame = function () {
        for(var i = this.numChildren-1; i > -1; i--){
            if(this.getChildAt(i).numChildren > 0){
                this.getChildAt(i).removeAllChildren();
            }
            this.removeChildAt(i);
        }
    };

    p.resetLevelsButtons = function (from,to) { // added for pagination
        this.levelsBtns.removeAllChildren();
        this.addLevelsButtons(from,to);
    };

    system.AbstractPuzzleGame = createjs.promote(AbstractPuzzleGame,"Container");

})();