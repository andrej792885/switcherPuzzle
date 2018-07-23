/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    var SolveCreditsComponent = function(game){
        this.Container_constructor();
        this.init(game);
    };

    var p = createjs.extend(SolveCreditsComponent,createjs.Container);
    p.game = null;
    p.bar = null;
    p.barLevel = null;
    p.numOfCredits = null;
    p.creditsTxt = null;

    p.init = function (game) {
        this.game = game;
        this.numOfCredits = this.game.mainGame.player.solveCredits;
        this.barLevel = this.game.mainGame.player.solveCreditsBarLevel;

        var frame = new createjs.Shape(new createjs.Graphics().setStrokeStyle(4).beginStroke("#fc5c61").drawRoundRect (0, 0, 402, 40, 6));
        frame.mouseEnabled = false;
        frame.cache(0,0,402,40);

        var bar = this.bar = new createjs.Shape(new createjs.Graphics().beginFill("#ffe2e9").drawRoundRect(0,0,387,27,6));
        bar.x = 7;
        bar.y = 7;
        bar.mouseEnabled = false;
        bar.scaleX = 0.25 * this.barLevel;

        var credits = this.creditsTxt = system.CustomMethods.makeText("X " + this.numOfCredits,"31px Russo One","#ffe2e9" , "center" , "alphabetic");
        credits.x = 435;
        credits.y = 31;

        var infoTxt = system.CustomMethods.makeText("solve button credits","27px Russo One","#fc5c61" , "center" , "alphabetic");
        infoTxt.x = 201;
        infoTxt.y = 30;

        this.addChild(frame,bar,credits,infoTxt);
    };

    p.levelSolved = function () {
        this.barLevel++;
        if(this.barLevel === 4){
            this.numOfCredits++;
            this.updateCreditsTxt();
            this.updateBar();
            this.barLevel = 0;
        }else{
            this.updateBar();
        }
    };

    p.updateCreditsTxt = function () {
        var that = this;
        createjs.Tween.get(this.creditsTxt).to({alpha:0},300).call(function () {
            that.creditsTxt.text = "X " + that.numOfCredits;
            createjs.Tween.get(that.creditsTxt).to({alpha:1},300);
        });

    };

    p.updateBar = function () {
        var that = this;
        var scale = 0.25 * this.barLevel;
        createjs.Tween.get(this.bar).to({scaleX:scale},300).call(function () {
            if(scale === 1){
                createjs.Tween.get(that.bar).to({scaleX:0},300);
            }
        });
    };

    system.SolveCreditsComponent = createjs.promote(SolveCreditsComponent,"Container");

})();