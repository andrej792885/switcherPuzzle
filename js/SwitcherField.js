/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    const SwitcherField = function(img,x,y,w,h){
        this.AbstractPuzzleField_constructor();
        this.initSwitcherField(img,x,y,w,h);//testing webstorm
    };

    const p = createjs.extend(SwitcherField, system.AbstractPuzzleField);

    p.currentPos = null; // this sets on every move
    p.correctPos = null; // this sets on start

    p.initSwitcherField = function (img,x,y,w,h) {
        const field = system.CustomMethods.makeImage(img , true);
        field.sourceRect = new createjs.Rectangle(x,y,w,h);
        field.width = field.sourceRect.width;
        field.height = field.sourceRect.height;
        field.regX = w/2;
        field.regY = h/2;
        this.x = x + w/2;
        this.y = y + h/2;
        this.correctPos = {xPos:this.x,yPos:this.y};
        this.currentPos = {xPos:this.x,yPos:this.y};
        const frame = new createjs.Shape(new createjs.Graphics().setStrokeStyle(2).beginStroke("#73d0fc").drawRect (0, 0, field.width, field.height));
        frame.regX = field.regX;
        frame.regY = field.regY;
        this.addChild(field,frame);
    };

    p.selectField = function () {
        this.alpha = 0.6;
    };

    p.setCurrentPos = function (x,y) {
        this.currentPos.xPos = x;
        this.currentPos.yPos = y;
    };

    p.checkPos = function () {
        let correct = false;
        if(this.currentPos.xPos === this.correctPos.xPos && this.currentPos.yPos === this.correctPos.yPos){
            correct = true;
        }
        return correct;
    };

    system.SwitcherField = createjs.promote(SwitcherField,"AbstractPuzzleField");

})();