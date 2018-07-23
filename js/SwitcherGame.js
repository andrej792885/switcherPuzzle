/**
 * Created by Conan on 21.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    var SwitcherGame = function(numOfLevels,main){
        this.AbstractPuzzleGame_constructor("Switcher",numOfLevels,main);
        this.initGame();
    };

    var p = createjs.extend(SwitcherGame, system.AbstractPuzzleGame);

    p.initGame = function () {};

    p.addLevelsButtons = function (from,to) {
        var that = this;
        var solvedLevels = this.mainGame.player.switcherPuzzleSolvedLevels;
        var levelsBtns = this.levelsBtns = new createjs.Container();

        for(var i = from; i < to; i++){
            var num = i+1;
            var level = "level" + num;
            var img = system.CustomMethods.makeImage(this.levelsOptions.options[level].mainImage , true);
            var levelBtn = new system.ImageButton(img,0.3);

            var firstEnd = from + 3;//9

            if(i >= firstEnd){//second row
                levelBtn.x = (i - firstEnd) * 389;
                levelBtn.y = 268;
            }else{//first row
                levelBtn.x = (i - from) * 389;//6
            }

            levelBtn.name = num;

/*            if(solvedLevels.indexOf(num) > -1){
                levelBtn.addSticker();
            }*/
            if(solvedLevels.hasOwnProperty(num)){ // addSticker se poziva ovde posto paginacija sklanja sve dugmice
                levelBtn.addSticker();
                levelBtn.addBestTime(this.timer.formatTime(solvedLevels[num]));
            }
            levelsBtns.addChild(levelBtn);

        }
        levelsBtns.on("click" , function (e) {
            that.level = e.target.parent.name;
            that.loadLevel(that.gameName);
            that.levelsBtns.visible = false;
        });

        levelsBtns.x = 252;
        levelsBtns.y = 134;

        this.addChild(levelsBtns);
    };

    system.SwitcherGame = createjs.promote(SwitcherGame,"AbstractPuzzleGame");
})();