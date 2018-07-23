/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    var ImageButton = function(img,scale){
        this.Container_constructor();
        this.init(img,scale);
    };

    var p = createjs.extend(ImageButton,createjs.Container);
    p.scale = 1;
    p.hasSticker = false;
    p._bestTimeTxt = null;

    p.init = function (img,scale) {
        if(scale){
            this.scale = scale;
        }
        var body = img;
        body.regX = body.image.width/2;
        //body.regY = body.image.height/2; // pisalo je regy sa malim y , suludo je sad menjati pozicije svim dugmicima u svim igrama
        this.addChild(body);
    };

    p.getButtonWidth = function () {
        return this.getChildAt(0).image.width;
    };

    p.getButtonHeight = function () {
        return this.getChildAt(0).image.height;
    };

    p.addSticker = function () {
        var stickerImg = system.CustomMethods.makeImage("solved" , false);
        stickerImg.regX = stickerImg.image.width/2;
        stickerImg.regY = stickerImg.image.height/2;
        stickerImg.scaleX = stickerImg.scaleY = this.scale;
        stickerImg.x = (this.getButtonWidth() * this.scale)/2;
        this.addChild(stickerImg);
        this.hasSticker = true;
    };

    p.addBestTime = function (time) {
        var text = this._bestTimeTxt = system.CustomMethods.makeText("Best time: " + time , "22px Russo One" , "white" , "center" , "alphabetic");
        text.y = this.getButtonHeight() * this.scale + 20;
        this.addChild(text);
    };

    p.updateBestTimeTxt = function (time) {
        this._bestTimeTxt.text = "Best time: " + time;
    };

    p.enableClick = function (bool) {
        this.mouseEnabled = bool;
        this.alpha = bool === true ? 1 : 0.6;
    };

    system.ImageButton = createjs.promote(ImageButton,"Container");

})();