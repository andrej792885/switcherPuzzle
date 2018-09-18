/**
 * Created by Conan on 27.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const SwitcherBoard = function(options,game){
        this.AbstractPuzzleBoard_constructor(options,game);
        this.initBoard();
    };

    const p = createjs.extend(SwitcherBoard, system.AbstractPuzzleBoard);

    p.initBoard = function () {};

    p.generateFields = function () {
        let x;
        let y;
        for(let i = 0; i < this.rows; i++){
            y = i * this.fieldHeight;
            for(let j = 0; j < this.columns; j++){
                x = j * this.fieldWidth;
                const name = "n" + i + j;
                const field = new system.SwitcherField(this.mainImage,x,y,this.fieldWidth,this.fieldHeight);
                field.name = name;
                this.addChild(field);
            }
        }
    };

    p.rearrangeFields = function () {
        const children = this.numChildren;
        for(let i = 0; i < children; i++){
            const randomNum = Math.round(Math.random() * (children-1));
            const child = this.getChildAt(i);
            const randomChild = this.getChildAt(randomNum);

            const childX = child.x;
            const childY = child.y;
            const randomChildX = randomChild.x;
            const randomChildY = randomChild.y;

            child.x = randomChildX;
            child.y = randomChildY;
            randomChild.x = childX;
            randomChild.y = childY;

            child.setCurrentPos(randomChildX,randomChildY);
            randomChild.setCurrentPos(childX,childY);
        }
        this.game.framesBtn.enableClick(true);
    };

    p.onChoose = function(e) {
        system.CustomMethods.playSound("switch");
        const child = e.target.parent.name;
        const field = this.getChildByName(child);
        field.selectField();
        if(this.selectedField){
            this.rotateFields(this.selectedField,field);
        }else{
            this.selectedField = field;
        }
    };

    p.rotateFields = function (field1 , field2) {
        this.enableMouse(false);
        this.doAnimation(field1,field2.x,field2.y);
        this.doAnimation(field2,field1.x,field1.y);
    };

    p.doAnimation = function (field,x,y) { // switching two fields
        createjs.Tween.get(field).to({scaleX:0.8,scaleY:0.8},200).to({x:x,y:y,scaleX:1,scaleY:1,alpha:1},400,createjs.Ease.getPowInOut(2)).call(()=> {
            this.actionAfterAnimation(field,x,y);
        });
    };

    p.actionAfterAnimation = function (field,x,y) {
        field.setCurrentPos(x,y);
        this.animationsCounter++;
        if(this.animationsCounter === 2){
            this.selectedField = null;
            this.animationsCounter = 0;
            this.checkBoard();
        }
    };

    p.doSolveAnimation = function (field) {
        createjs.Tween.get(field).to({x:field.correctPos.xPos,y:field.correctPos.yPos},600).call(()=> {
            this.animationsCounter++;
            field.setCurrentPos(field.x,field.y);
            if(this.animationsCounter === this.numChildren){
                this.animationsCounter = 0;
                this.checkBoard();
            }
        })
    };

    system.SwitcherBoard = createjs.promote(SwitcherBoard,"AbstractPuzzleBoard");
})();