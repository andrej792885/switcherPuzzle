/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    var AbstractPuzzleField = function(){
        this.Container_constructor();
        this.init();
    };

    var p = createjs.extend(AbstractPuzzleField, createjs.Container);


    p.init = function () {};

    p.removeFrame = function () {
        var that = this;
        var frame = this.getChildAt(1);
        createjs.Tween.get(frame).to({alpha:0},500).call(function () {
            that.removeChild(frame);
        });
    };

    p.showHideFrame = function () {
        var frame = this.getChildAt(1);
        frame.visible = !frame.visible;
    };

    p.removeField = function () {
        this.removeAllChildren();
        this.parent.removeChild(this);
    };

    system.AbstractPuzzleField = createjs.promote(AbstractPuzzleField,"Container");

})();