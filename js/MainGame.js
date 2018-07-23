/**
 * Created by Milan on 2/23/2017.
 */

this.system = this.system || {};
(function(){
    "use strict";

    var MainGame = function(){
        this.Container_constructor();
        this.init();
    };

    var p = createjs.extend(MainGame,createjs.Container);
    p.game = null;
    p.player = null;

    p._switcherPuzzleBtn = null;
    p._switcherProgressionTxt = null;

    MainGame.GAME_WIDTH = 0;
    MainGame.GAME_HEIGHT = 0;

    p.init = function () {
        var that = this;
        MainGame.GAME_WIDTH = 1280;
        MainGame.GAME_HEIGHT = 720;
        var back = system.CustomMethods.makeImage("background" , false);
        this.addChild(back);

        // SWITCHER
        var img = system.CustomMethods.makeImage("switcherBtn" , false);
        var switcherPuzzleBtn = this._switcherPuzzleBtn = new system.ImageButton(img);

        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0, 0, img.image.width, img.image.height);
        hit.regX = img.image.width/2;
        switcherPuzzleBtn.hitArea = hit;

        switcherPuzzleBtn.x = 220;
        switcherPuzzleBtn.y = 100;
        switcherPuzzleBtn.on("click",function(event){
            that.addGame("SwitcherGame",24);//change updateProgression if numer of levels changed
        });

        var switcherProgressionTxt = this._switcherProgressionTxt = system.CustomMethods.makeText("" , "27px Russo One" , "white" , "center" , "alphabetic");
        switcherProgressionTxt.x = switcherPuzzleBtn.x;
        switcherProgressionTxt.y = 330;
        // SWITCHER

        this.addChild(switcherPuzzleBtn, switcherProgressionTxt);

        this.showMainGameComponents(false);
        this.setPlayerInfo();
    };

    p.showMainGameComponents = function (bool) {
        this._switcherPuzzleBtn.visible =
        this._switcherProgressionTxt.visible = bool;
    };
    
    p.addGame = function (name,numOfLevels) {
/*        if(this.game){
            this.removeGame();
        }*/
        if(!this.game){
            this.game = new system[name](numOfLevels,this);
            this.addChild(this.game);
            this.showMainGameComponents(false);
        }else{
            this.game.visible = true;
            this.showMainGameComponents(false);
        }
// git test
    };

    p.removeGame = function () {
/*        this.game.destroyGame();
        this.removeChild(this.game);*/
        this.game.visible = false;
        this.showMainGameComponents(true);
    };

    p.setPlayerInfo = function () {
        var stats = JSON.parse(localStorage.getItem("playerStats"));
        if(stats === null){
            stats = {
                "switcherPuzzleSolvedLevels": {},
                "solveCredits": 0,
                "solveCreditsBarLevel": 0
            };
            localStorage.setItem("playerStats" , JSON.stringify(stats));
        }
        this.player = new system.Player(stats);
        this.showMainGameComponents(true); // only when player is set game can start
        this.setProgressionTexts();
    };

    p.updatePlayer = function () {
        this.player.levelSolved(this.game.gameName , this.game.level , this.game.timer.takeTime());
        this.player.updateSolveCredits(this.game.solveCreditsComponent.numOfCredits,this.game.solveCreditsComponent.barLevel);
        this.updateProgression();
        this.updateLocalStorage();
    };

    p.updateLocalStorage = function() {
        var stats = {
            "switcherPuzzleSolvedLevels": this.player.switcherPuzzleSolvedLevels,
            "solveCredits": this.player.solveCredits,
            "solveCreditsBarLevel": this.player.solveCreditsBarLevel
        };
        localStorage.setItem("playerStats" , JSON.stringify(stats));
    };

    p.setProgressionTexts = function () {
        var switcherSolved = Object.keys(this.player.switcherPuzzleSolvedLevels).length;
        this._switcherProgressionTxt.text = "Progression: " + Math.round((100/24) * switcherSolved) + "%";//100/numLevels*solved
    };

    p.updateProgression = function () {
        var numberOfSolvedLevels = Object.keys(this.player.switcherPuzzleSolvedLevels).length;
        this._switcherProgressionTxt.text = "Progression: " + Math.round((100/this.game.numberOfLevels) * numberOfSolvedLevels) + "%";//100/numLevels*solved
    };

    p.render = function(e){
        stage.update(e);
    };

    system.MainGame = createjs.promote(MainGame,"Container");
})();


