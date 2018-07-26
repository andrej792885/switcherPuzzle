/**
 * Created by Conan on 21.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const SwitcherGame = function(numOfLevels,main){
        this.AbstractPuzzleGame_constructor("Switcher",numOfLevels,main);
        this.initGame();
    };

    const p = createjs.extend(SwitcherGame, system.AbstractPuzzleGame);

    p.initGame = function () {};

    p.addLevelsButtons = function (from,to) {
        console.log("adding buttons");
        const solvedLevels = this.mainGame.player.switcherPuzzleSolvedLevels;
        const levelsBtns = this.levelsBtns = new createjs.Container();

        for(let i = from; i < to; i++){
            const num = i+1;
            const level = "level" + num;
            const img = system.CustomMethods.makeImage(this.levelsOptions.options[level].mainImage , true);
            const levelBtn = new system.ImageButton(img,0.3);

            const firstEnd = from + 3;//9

            if(i >= firstEnd){//second row
                levelBtn.x = (i - firstEnd) * 389;
                levelBtn.y = 268;
            }else{//first row
                levelBtn.x = (i - from) * 389;//6
            }

            levelBtn.name = num;

            levelBtn.addSticker();
            levelBtn.addBestTime();
            levelsBtns.addChild(levelBtn);

        }
        levelsBtns.on("click" , (e)=> {
            this.level = e.target.parent.name;
            this.loadLevel(this.gameName);
            this.levelsBtns.visible = false;
        });

        levelsBtns.x = 270;
        levelsBtns.y = 134;

        this.addChild(levelsBtns);
    };

    p.refreshLevelsButtons = function(from , to){
        const solvedLevels = this.mainGame.player.switcherPuzzleSolvedLevels;
        let childInd = 0;
        for(let i = from; i < to; i++){
            const num = i+1;
            const level = "level" + num;
            const levelBtn = this.levelsBtns.getChildAt(childInd);
            const imgName = this.levelsOptions.options[level].mainImage;
            system.CustomMethods.swapImages(levelBtn.getChildAt(0) , imgName);

            levelBtn.name = num;

            if(solvedLevels.hasOwnProperty(num)){ // addSticker se poziva ovde posto paginacija sklanja sve dugmice
                levelBtn.showSticker(true);
                levelBtn.updateBestTimeTxt(this.timer.formatTime(solvedLevels[num]));
            }else{
                levelBtn.showSticker(false);
                levelBtn.updateBestTimeTxt("");
            }
            childInd++;
        }
    };

    system.SwitcherGame = createjs.promote(SwitcherGame,"AbstractPuzzleGame");
})();