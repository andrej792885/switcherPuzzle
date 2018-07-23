/**
 * Created by konan on 24-May-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    var Player = function(stats){
        this.init(stats);
    };

    var p = Player.prototype;
    p.switcherPuzzleSolvedLevels = null;
    p.sliderPuzzleSolvedLevels = null;
    p.memoryPuzzleSolvedLevels = null;
    p.solveCredits = null;
    p.solveCreditsBarLevel = null;

    p.init = function (stats) {
        console.log(stats);
        this.switcherPuzzleSolvedLevels = stats.switcherPuzzleSolvedLevels;
        this.sliderPuzzleSolvedLevels = stats.sliderPuzzleSolvedLevels;
        this.memoryPuzzleSolvedLevels = stats.memoryPuzzleSolvedLevels;
        this.solveCredits = stats.solveCredits;
        this.solveCreditsBarLevel = stats.solveCreditsBarLevel;
    };

    p.levelSolved = function (game,level,time) {
        var solved = game.toLowerCase() + "PuzzleSolvedLevels";
        if(!this[solved].hasOwnProperty(level)){
            this[solved][level] = time;
        }else{
            if(this[solved][level] > time){
                this[solved][level] = time;
            }
        }
    };

    p.updateSolveCredits = function (credits,barLevel) {
        this.solveCredits = credits;
        this.solveCreditsBarLevel = barLevel;
    };

    system.Player = Player;

})();