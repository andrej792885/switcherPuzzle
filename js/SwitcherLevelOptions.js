/**
 * Created by Conan on 28.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const SwitcherLevelOptions = function(){
        this.init();
    };

    const p = SwitcherLevelOptions.prototype;
    p.options = null;

    p.init = function () {
        this.options = {
            level1:{
                rows:3,
                columns:4,
                fieldWidth:268,
                fieldHeight:201,
                mainImage:"switcher"
            },
            level2:{
                rows:5,
                columns:5,
                fieldWidth:214,
                fieldHeight:121,
                mainImage:"switcher2"
            },
            level3:{
                rows:5,
                columns:5,
                fieldWidth:214,
                fieldHeight:121,
                mainImage:"switcher3"
            },
            level4:{
                rows:6,
                columns:8,
                fieldWidth:134,
                fieldHeight:100,
                mainImage:"switcher4"
            },
            level5:{
                rows:2,
                columns:16,
                fieldWidth:67,
                fieldHeight:302,
                mainImage:"switcher5"
            },
            level6:{
                rows:15,
                columns:2,
                fieldWidth:536,
                fieldHeight:40,
                mainImage:"switcher6"
            },
            level7:{
                rows:5,//
                columns:5,///
                fieldWidth:214,
                fieldHeight:121,
                mainImage:"switcher7"
            },
            level8:{
                rows:5,
                columns:5,
                fieldWidth:214,
                fieldHeight:121,
                mainImage:"switcher8"
            },
            level9:{
                rows:6,
                columns:8,
                fieldWidth:134,
                fieldHeight:100,
                mainImage:"switcher9"
            },
            level10:{
                rows:6,
                columns:8,
                fieldWidth:134,
                fieldHeight:106,
                mainImage:"switcher10"
            },
            level11:{
                rows:4,
                columns:16,
                fieldWidth:67,
                fieldHeight:151,
                mainImage:"switcher11"
            },
            level12:{//
                rows:10,
                columns:4,
                fieldWidth:268,
                fieldHeight:60,
                mainImage:"switcher12"
            },
            level13:{
                rows:6,
                columns:4,
                fieldWidth:268,
                fieldHeight:101,
                mainImage:"switcher13"
            },
            level14:{
                rows:5,
                columns:8,
                fieldWidth:134,
                fieldHeight:121,
                mainImage:"switcher14"
            },
            level15:{
                rows:9,
                columns:5,
                fieldWidth:214,
                fieldHeight:67,
                mainImage:"switcher15"
            },
            level16:{
                rows:6,
                columns:8,
                fieldWidth:134,
                fieldHeight:100,
                mainImage:"switcher16"
            },
            level17:{
                rows:4,
                columns:10,
                fieldWidth:107,
                fieldHeight:151,
                mainImage:"switcher17"
            },
            level18:{
                rows:15,
                columns:2,
                fieldWidth:536,
                fieldHeight:40,
                mainImage:"switcher18"
            },
            level19:{
                rows:10,
                columns:5,
                fieldWidth:214,
                fieldHeight:60,
                mainImage:"switcher19"
            },
            level20:{
                rows:5,
                columns:8,
                fieldWidth:134,
                fieldHeight:121,
                mainImage:"switcher20"
            },
            level21:{
                rows:5,
                columns:10,
                fieldWidth:107,
                fieldHeight:120,
                mainImage:"switcher21"
            },
            level22:{
                rows:6,
                columns:8,
                fieldWidth:134,
                fieldHeight:100,
                mainImage:"switcher22"
            },
            level23:{//////////////////////////////
                rows:2,
                columns:16,
                fieldWidth:67,
                fieldHeight:300,
                mainImage:"switcher23"
            },
            level24:{
                rows:15,
                columns:2,
                fieldWidth:536,
                fieldHeight:40,
                mainImage:"switcher24"
            }
        }
    };
    
    p.getOptionsForLevel = function(level){
        const lvl = "level" + level;
        return this.options[lvl];
    };

    system.SwitcherLevelOptions = SwitcherLevelOptions;

})();