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
    p.background = null;

    p._playBtn = null;
    p._optionsBtn = null;
    p._options = null;
    p._switcherProgressionTxt = null;
    p._totalTimePlayedTxt = null;
    p._logo = null;

    MainGame.GAME_WIDTH = 0;
    MainGame.GAME_HEIGHT = 0;

    p.init = function () {
        MainGame.GAME_WIDTH = 1920;
        MainGame.GAME_HEIGHT = 1080;
        const back = this.background = system.CustomMethods.makeImage("background1" , false);
        this.addChild(back);

        const logo = this._logo = system.CustomMethods.makeImage("logo" , false);
        logo.x = (MainGame.GAME_WIDTH/2) - logo.image.width/2;
        logo.y = 50;

        const img = system.CustomMethods.makeImage("playButton" , true);
        const playBtn = this._playBtn = new system.ImageButton(img);
        playBtn.x = (MainGame.GAME_WIDTH/2);
        playBtn.y = 400;
        playBtn.addEventListener("click" , (e)=>{
            this.showMainGameComponents(false);
        });

        const img2 = system.CustomMethods.makeImage("optionsButton" , true);
        const optionsBtn = this._optionsBtn = new system.ImageButton(img2);
        optionsBtn.x = playBtn.x;
        optionsBtn.y = 500;
        optionsBtn.addEventListener("click" , (e)=>{
            options.visible = !options.visible;
        });

        const options = this._options = new system.Options(this.background);
        options.x = 766;
        options.y = 600;


        const switcherProgressionTxt = this._switcherProgressionTxt = system.CustomMethods.makeText("" , "27px Russo One" , "white" , "center" , "alphabetic");
        switcherProgressionTxt.x = playBtn.x;
        switcherProgressionTxt.y = 950;

        const totalTimePlayedTxt = this._totalTimePlayedTxt = system.CustomMethods.makeText("" , "27px Russo One" , "white" , "center" , "alphabetic");
        totalTimePlayedTxt.x = playBtn.x;
        totalTimePlayedTxt.y = 1000;

/*        this.fps = system.CustomMethods.makeText("","27px Russo One" , "white" , "center" , "alphabetic");
        this.fps.x = 50;
        this.fps.y = 50;*/

        this.addChild(logo , playBtn , optionsBtn, switcherProgressionTxt , totalTimePlayedTxt , options);
        this.setPlayerInfo();
        this.addGame(60);
        this.showMainGameComponents(true);
    };

    p.showMainGameComponents = function (bool) {
        this._options.visible = false;
        this._logo.visible =
        this._playBtn.visible =
        this._optionsBtn.visible =
        this._switcherProgressionTxt.visible =
        this._totalTimePlayedTxt.visible = bool;
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
                "solveCredits": 0,
                "solveCreditsBarLevel": 0,
                "totalTimePlayed":0
            };
            localStorage.setItem("playerStats" , JSON.stringify(stats));
        }
        this.player = new system.Player(stats);
        this.updateProgressionTxt();
        this.updateTotalTimePlayedTxt();
    };

    p.updatePlayer = function () {
        this.player.levelSolved(this.game.level , this.game.timer.takeTime());
        this.player.updateSolveCredits(this.game.solveCreditsComponent.numOfCredits,this.game.solveCreditsComponent.barLevel);
        this.updateProgressionTxt();
        this.updateTotalTimePlayedTxt();
        this.updateLocalStorage();
    };

    p.updateLocalStorage = function() {
        const stats = {
            "switcherPuzzleSolvedLevels": this.player.switcherPuzzleSolvedLevels,
            "solveCredits": this.player.solveCredits,
            "solveCreditsBarLevel": this.player.solveCreditsBarLevel,
            "totalTimePlayed": this.player.totalTimePlayed
        };
        localStorage.setItem("playerStats" , JSON.stringify(stats));
    };

    p.updateTotalTimePlayedTxt = function() {
        this._totalTimePlayedTxt.text = "Total time played: " + system.CustomMethods.formatTime(this.player.totalTimePlayed);
    };

    p.updateProgressionTxt = function () {
        const numberOfSolvedLevels = Object.keys(this.player.switcherPuzzleSolvedLevels).length;
        this._switcherProgressionTxt.text = "Progression: " + Math.round((100/60) * numberOfSolvedLevels) + "%";//100/numLevels*solved
    };

    p.render = function(e){
        stage.update(e);
        //this.fps.text = Math.round(createjs.Ticker.getMeasuredFPS());
    };

    system.MainGame = createjs.promote(MainGame,"Container");
})();


