/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    var PaginationComponent = function(numPages,game){
        this.Container_constructor();
        this.init(numPages,game);
    };

    var p = createjs.extend(PaginationComponent,createjs.Container);
    p.game = null;
    p.leftButton = null;
    p.rightButton = null;
    p.currentPage = null;
    p.currentPageTxt = null;
    p.numOfPages = null;

    p.init = function (numPages,game) {
        this.game = game;
        var that = this;
        this.numOfPages = numPages;
        this.currentPage = 1;

        var back = system.CustomMethods.makeImage("paginationBack" , false);

        var current = this.currentPageTxt = system.CustomMethods.makeText(this.currentPage,"31px Russo One","#fdfdff" , "center" , "alphabetic");
        current.x = 107;
        current.y = 47;

        var img = system.CustomMethods.makeImage("leftBtn" , true);
        var left = this.leftButton = new system.ImageButton(img);
        left.on("click",function(event){
            that.onLeftBtn();
        });
        left.x = 40;
        left.y = 7;

        var img2 = system.CustomMethods.makeImage("rightBtn" , true);
        var right = this.rightButton = new system.ImageButton(img2);
        right.on("click",function(event){
            that.onRightBtn();
        });

        right.x = 174;
        right.y = 7;

        this.addChild(back,current,left,right);

        if(numPages === 1){
            left.enableClick(false);
            right.enableClick(false);
        }
    };

    p.onLeftBtn = function () {
        if(this.currentPage > 1){
            this.currentPage --;
            this.updateComponents()
        }
    };

    p.onRightBtn = function () {
        if(this.currentPage < this.numOfPages){
            this.currentPage ++;
            this.updateComponents()
        }
    };

    p.updateComponents = function () {
        var leftEnable = this.currentPage > 1;
        var rightEnable = this.currentPage < this.numOfPages;
        this.leftButton.enableClick(leftEnable);
        this.rightButton.enableClick(rightEnable);
        this.currentPageTxt.text = this.currentPage;
        var from = (this.currentPage-1) * 6;
        var to = from + 6;
        this.game.resetLevelsButtons(from,to);
    };

    system.PaginationComponent = createjs.promote(PaginationComponent,"Container");

})();