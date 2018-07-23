/**
 * Created by konan on 04-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    var LoadingComponent = function(options){
        this.Container_constructor();
        this.initLoader(options);
    };

    var p = createjs.extend(LoadingComponent, createjs.Container);
    p._loadingBar = null;
    p._loadingFrame = null;
    p._loadingTxt = null;

    p.initLoader = function (options) {
        var loadingTxt = this._loadingTxt = new createjs.Text("Setting up image...","46px Russo One","white");
        loadingTxt.textAlign = "center";
        loadingTxt.textBaseline = "alphabetic";
        loadingTxt.x = options.frameWidth/2;

        var loadingFrame = this._loadingFrame = new createjs.Shape(new createjs.Graphics().setStrokeStyle(options.frameStroke).beginStroke(options.frameStrokeColor).drawRoundRect (0, 0, options.frameWidth, options.frameHeight, options.frameRoundness));
        var loadingBar = this._loadingBar = new createjs.Shape(new createjs.Graphics().beginFill(options.barColor).drawRect(0,0,options.barWidth,options.barHeight));
        loadingBar.x = 7;
        loadingBar.y = 7;
        loadingBar.scaleX = 0;
        loadingTxt.y = this._loadingBar.y -(options.boardHeight) - 68;
        this.addChild(loadingFrame,loadingBar,loadingTxt);
    };
    
    p.reset = function (options) {
        this._loadingFrame.graphics.clear().setStrokeStyle(options.frameStroke).beginStroke(options.frameStrokeColor).drawRoundRect (0, 0, options.frameWidth, options.frameHeight, options.frameRoundness);
        this._loadingBar.graphics.clear().beginFill(options.barColor).drawRect(0,0,options.barWidth,options.barHeight);
        this._loadingBar.scaleX = 0;
        this._loadingTxt.x = options.frameWidth/2;
        this._loadingTxt.y = this._loadingBar.y -(options.boardHeight) - 68;
    };
    
    p.updateLoadingBar = function (percent) {
        this._loadingBar.scaleX = percent;
    };
    
    system.LoadingComponent = createjs.promote(LoadingComponent,"Container");
})();