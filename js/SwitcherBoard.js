/**
 * Created by Conan on 27.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    var SwitcherBoard = function(options,game){
        this.AbstractPuzzleBoard_constructor(options,game);
        this.initBoard();
    };

    var p = createjs.extend(SwitcherBoard, system.AbstractPuzzleBoard);
    var that;

    p.initBoard = function () {
        that = this;
    };

    p.generateFields = function () {
        var x;
        var y;
        for(var i = 0; i < this.rows; i++){
            y = i * this.fieldHeight;
            for(var j = 0; j < this.columns; j++){
                x = j * this.fieldWidth;
                var name = "n" + i + j;
                var field = new system.SwitcherField(this.mainImage,x,y,this.fieldWidth,this.fieldHeight);
                field.name = name;
                this.addChild(field);
            }
        }
    };

    p.rearrangeFields = function () {
        var children = this.numChildren;
        for(var i = 0; i < children; i++){
            var randomNum = Math.round(Math.random() * (children-1));
            var child = this.getChildAt(i);
            var randomChild = this.getChildAt(randomNum);

            var childX = child.x;
            var childY = child.y;
            var randomChildX = randomChild.x;
            var randomChildY = randomChild.y;

            child.x = randomChildX;
            child.y = randomChildY;
            randomChild.x = childX;
            randomChild.y = childY;

            child.setCurrentPos(randomChildX,randomChildY);
            randomChild.setCurrentPos(childX,childY);
        }
        this.game.framesBtn.enableClick(true);
    };

    p.onChoose = function (e) {
        var child = e.target.parent.name;
        var field = that.getChildByName(child);
        field.selectField();
        if(that.selectedField){
            that.rotateFields(that.selectedField,field);
        }else{
            that.selectedField = field;
        }
    };

    p.rotateFields = function (field1 , field2) {
        this.enableMouse(false);
        this.doAnimation(field1,field2.x,field2.y);
        this.doAnimation(field2,field1.x,field1.y);
    };

    p.doAnimation = function (field,x,y) { // switching two fields
        createjs.Tween.get(field).to({scaleX:0.8,scaleY:0.8},200).to({x:x,y:y,scaleX:1,scaleY:1,alpha:1},400,createjs.Ease.getPowInOut(2)).call(function () {
            that.actionAfterAnimation(field,x,y);
        });
    };

    p.actionAfterAnimation = function (field,x,y) {
        field.setCurrentPos(x,y);
        that.animationsCounter++;
        if(that.animationsCounter === 2){
            that.selectedField = null;
            that.animationsCounter = 0;
            that.checkBoard();
        }
    };

    p.doSolveAnimation = function (field) {
        createjs.Tween.get(field).to({x:field.correctPos.xPos,y:field.correctPos.yPos},600).call(function () {
            that.animationsCounter++;
            field.setCurrentPos(field.x,field.y);
            if(that.animationsCounter === that.numChildren){
                that.animationsCounter = 0;
                that.checkBoard();
            }
        })
    };

    system.SwitcherBoard = createjs.promote(SwitcherBoard,"AbstractPuzzleBoard");
})();