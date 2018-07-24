/**
 * Created by Milan on 2/23/2017.
 */

this.system = this.system || {};
(function(){
    "use strict";

    const MainGame = function(){
        this.Container_constructor();
        this.init();
    };

    const p = createjs.extend(MainGame,createjs.Container);
    p.game = null;
    p.player = null;

    p._switcherPuzzleBtn = null;
    p._switcherProgressionTxt = null;

    MainGame.GAME_WIDTH = 0;
    MainGame.GAME_HEIGHT = 0;

    p.init = function () {
        MainGame.GAME_WIDTH = 1280;
        MainGame.GAME_HEIGHT = 720;
        const back = system.CustomMethods.makeImage("background" , false);
        this.addChild(back);

        const img = system.CustomMethods.makeImage("switcherBtn" , false);
        const switcherPuzzleBtn = this._switcherPuzzleBtn = new system.ImageButton(img);

        const hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0, 0, img.image.width, img.image.height);
        hit.regX = img.image.width/2;
        switcherPuzzleBtn.hitArea = hit;
        switcherPuzzleBtn.x = 220;
        switcherPuzzleBtn.y = 100;
        switcherPuzzleBtn.addEventListener("click" , (e)=>{
            this.showMainGameComponents(false);
        });

        const switcherProgressionTxt = this._switcherProgressionTxt = system.CustomMethods.makeText("" , "27px Russo One" , "white" , "center" , "alphabetic");
        switcherProgressionTxt.x = switcherPuzzleBtn.x;
        switcherProgressionTxt.y = 330;

        this.addChild(switcherPuzzleBtn, switcherProgressionTxt);
        this.setPlayerInfo();
        this.addGame(24);
        this.showMainGameComponents(true);
    };

    p.showMainGameComponents = function (bool) {
        this._switcherPuzzleBtn.visible =
        this._switcherProgressionTxt.visible = bool;
        this.game.visible = !bool;
    };
    
    p.addGame = function (numOfLevels) {
        this.game = new system.SwitcherGame(numOfLevels,this);
        this.addChild(this.game);
    };

    p.setPlayerInfo = function () {
        let stats = JSON.parse(localStorage.getItem("playerStats"));
        if(stats === null){
            stats = {
                "switcherPuzzleSolvedLevels": {},
                "solveCredits": 10,
                "solveCreditsBarLevel": 0
            };
            localStorage.setItem("playerStats" , JSON.stringify(stats));
        }
        this.player = new system.Player(stats);
        this.setProgressionTexts();
    };

    p.updatePlayer = function () {
        this.player.levelSolved(this.game.level , this.game.timer.takeTime());
        this.player.updateSolveCredits(this.game.solveCreditsComponent.numOfCredits,this.game.solveCreditsComponent.barLevel);
        this.updateProgression();
        this.updateLocalStorage();
    };

    p.updateLocalStorage = function() {
        const stats = {
            "switcherPuzzleSolvedLevels": this.player.switcherPuzzleSolvedLevels,
            "solveCredits": this.player.solveCredits,
            "solveCreditsBarLevel": this.player.solveCreditsBarLevel
        };
        localStorage.setItem("playerStats" , JSON.stringify(stats));
    };

    p.setProgressionTexts = function () {
        const switcherSolved = Object.keys(this.player.switcherPuzzleSolvedLevels).length;
        this._switcherProgressionTxt.text = "Progression: " + Math.round((100/24) * switcherSolved) + "%";//100/numLevels*solved
    };

    p.updateProgression = function () {
        const numberOfSolvedLevels = Object.keys(this.player.switcherPuzzleSolvedLevels).length;
        this._switcherProgressionTxt.text = "Progression: " + Math.round((100/this.game.numberOfLevels) * numberOfSolvedLevels) + "%";//100/numLevels*solved
    };

    p.render = function(e){
        stage.update(e);

    };

    system.MainGame = createjs.promote(MainGame,"Container");
})();


