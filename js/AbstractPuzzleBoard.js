/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    var AbstractPuzzleBoard = function(options,game){
        this.Container_constructor();
        this.init(options,game);
    };

    var p = createjs.extend(AbstractPuzzleBoard, createjs.Container);
    p.rows = 0;
    p.columns = 0;
    p.fieldWidth = 0;
    p.fieldHeight = 0;
    p.fieldSpacing = 0;
    p.selectedField = null;
    p.animationsCounter = 0;
    p.mainImage = "";
    p.game = null;
    var that;

    p.init = function (options,game) {
        that = this;
        this.game = game;
        this.setBoard(options);
        this.addEventListener("click",this.onChoose);
    };

    p.setBoard = function (options) {
        this.rows = options.rows;
        this.columns = options.columns;
        this.fieldWidth = options.fieldWidth;
        this.fieldHeight = options.fieldHeight;
        this.mainImage = options.mainImage;
        this.generateFields();
        this.rearrangeFields();
    };

    p.checkBoard = function () {
        var children = this.numChildren;
        var correct = 0;
        for(var i = 0; i < children; i++){
            if(this.getChildAt(i).checkPos()){
                correct++;
            }else{
                break;
            }
        }
        if(children === correct){
            this.enableMouse(false);
            this.game.levelSolved();
            this.removeFieldFrames();
        }else{
            that.enableMouse(true);
        }
    };

    p.removeFieldFrames = function () {
        var children = this.numChildren;
        for(var i = 0; i < children; i++){
            this.getChildAt(i).removeFrame();
        }
    };

    p.showHideFrames = function () {
        var children = this.numChildren;
        for(var i = 0; i < children; i++){
            this.getChildAt(i).showHideFrame();
        }
    };

    p.removeFields = function () {
        var children = this.numChildren-1;
        for(var i = children; i > -1; i--){
            this.getChildAt(i).removeField();
        }
    };
    
    p.solvePuzzle = function () {
        var children = this.numChildren;
        this.game.framesBtn.enableClick(false);
        this.game.solveBtn.enableClick(false);
        for(var i = 0; i < children; i++){
            var child = this.getChildAt(i);
            this.doSolveAnimation(child);
        }
    };

    p.getBoardWidth = function () {
        return (this.columns * this.fieldWidth) + (this.columns * this.fieldSpacing);
    };

    p.getBoardHeight = function () {
        return (this.rows * this.fieldHeight) + (this.columns * this.fieldSpacing);
    };

    p.enableMouse = function (bool) {
        this.mouseEnabled = bool;
    };

    system.AbstractPuzzleBoard = createjs.promote(AbstractPuzzleBoard,"Container");

})();