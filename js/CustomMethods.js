this.system = this.system || {};

(function() {
    "use strict";

    const CustomMethods = function() {};

    CustomMethods.makeText = function (txt,font,color,align,baseline) {
        const textField = new createjs.Text(txt, font, color);
        textField.textAlign = align;
        textField.textBaseline = baseline;
        textField.mouseEnabled = false;
        textField.tickEnabled = false;
        return textField;
    };

    CustomMethods.makeImage = function (id , clickable) {
        const img = new createjs.Bitmap(queue.getResult(id));
        img.mouseEnabled = clickable;
        img.tickEnabled = false;
        return img;
    };

    CustomMethods.swapImages = function(original , newImage){
        original.image = queue.getResult(newImage);
    };

    CustomMethods.makeImageFromAtlas = function (atlas , json , imgName) {
        const imgPropsIndex = json.animations[imgName];
        const imgProps = json.frames[imgPropsIndex];
        const img = atlas.clone();
        img.sourceRect = new createjs.Rectangle(imgProps[0],imgProps[1],imgProps[2],imgProps[3]);
        return img;
    };

    CustomMethods.playSound = function (id , vol , loop) {
        loop = loop || 0;
        vol = vol || 1;
        createjs.Sound.play(id, {loop:loop, volume:vol});
    };

    CustomMethods.getLastChar = function (str) {
        return str.charAt(str.length - 1);
    };

    CustomMethods.makeAnimation = function (img,framesNum,fps,loop) {
        const sheet = queue.getResult(img);
        const singleWidth = sheet.width/framesNum;
        const singleHeight = sheet.height;
        const frames = framesNum - 1;
        const data = {
            images: [sheet],
            frames: {regX:singleWidth/2 , regY:singleHeight/2 ,width: singleWidth, height: singleHeight, count:framesNum},
            animations: {
                animate: [0, frames , loop]
            },
            framerate:fps
        };
        const bmpAnimation = new createjs.SpriteSheet(data);
        const animation = new createjs.Sprite(bmpAnimation);
        animation.mouseEnabled = false;
        return animation;
    };

    CustomMethods.getRandomNumberFromTo = function (from , to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };

    CustomMethods.getRandomBool = function () {
        return Math.random() > 0.5;
    };

    CustomMethods.shuffleArr = function (arr) {
        arr.sort(function(a, b){return 0.5 - Math.random()});
        return arr;
    };

    CustomMethods.formatTime = function (timeInSeconds) {
        let seconds;
        let minutes;
        let hours;
        if(timeInSeconds > 3599){

        }
        if(timeInSeconds > 59){
            seconds = timeInSeconds%60;
            minutes = (timeInSeconds - seconds)/60;
        }else{
            minutes = "00";
            seconds = timeInSeconds > 9 ? timeInSeconds : "0" + timeInSeconds;
        }
        return minutes + ":" + seconds;
    };

    system.CustomMethods = CustomMethods;
})();