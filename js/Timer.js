/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    var Timer = function(){
        this.Container_constructor();
        this.initTimer();
    };

    var p = createjs.extend(Timer,createjs.Container);

    p._seconds = 0;
    p._minutes = 0;
    p._timerTxt = "";
    p._interval = null;


    p.initTimer = function () {
        var text = this._timerTxt = system.CustomMethods.makeText("00:00","36px Russo One","white" , "center" , "alphabetic");
        this.addChild(text);
    };

    p.startTimer = function () {
        var that = this;
        var minutes = "";
        var seconds = "";
        this._interval = setInterval(function() {
            that._seconds++;
            if(that._seconds > 59){
                that._seconds = 0;
                that._minutes++;
            }

            minutes = that._minutes < 10 ? "0" + that._minutes : "" + that._minutes; //  da bi zadrzao tip promenjive , tj da ne bude do 9 string , a posle number
            seconds = that._seconds < 10 ? "0" + that._seconds : "" + that._seconds;
            that._timerTxt.text = minutes + ":" + seconds;
        },1000);
    };

    p.stopTimer = function () {
        clearInterval(this._interval);
        this._interval = null;
    };

    p.takeTime = function () {
        return this._seconds + (this._minutes * 60);
    };

    p.formatTime = function (timeInSeconds) {
        var seconds;
        var minutes;
        if(timeInSeconds > 59){
            seconds = timeInSeconds%60;
            minutes = (timeInSeconds - seconds)/60;
        }else{
            minutes = "00";
            seconds = timeInSeconds > 9 ? timeInSeconds : "0" + timeInSeconds;
        }
        return minutes + ":" + seconds;
    };

    p.reset = function () {
        this._seconds = 0;
        this._minutes = 0;
        this._timerTxt.text = "00:00";
    };

    p.show = function (bool) {
        this.visible = bool;
    };

    system.Timer = createjs.promote(Timer,"Container");

})();