/**
 * Created by konan on 24-May-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    const Player = function(stats){
        this.init(stats);
    };

    const p = Player.prototype;
    p.switcherPuzzleSolvedLevels = null;
    p.solveCredits = null;
    p.solveCreditsBarLevel = null;

    p.init = function (stats) {
        this.switcherPuzzleSolvedLevels = stats.switcherPuzzleSolvedLevels;
        this.solveCredits = stats.solveCredits;
        this.solveCreditsBarLevel = stats.solveCreditsBarLevel;
    };

    p.levelSolved = function (level,time) {
        if(!this.switcherPuzzleSolvedLevels.hasOwnProperty(level)){
            this.switcherPuzzleSolvedLevels[level] = time;
        }else{
            if(this.switcherPuzzleSolvedLevels[level] > time){
                this.switcherPuzzleSolvedLevels[level] = time;
            }
        }
    };

    p.updateSolveCredits = function (credits,barLevel) {
        this.solveCredits = credits;
        this.solveCreditsBarLevel = barLevel;
    };

    system.Player = Player;

})();