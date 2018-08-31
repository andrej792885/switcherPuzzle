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
                fieldWidth:400,
                fieldHeight:300,
                mainImage:"switcher"
            },
            level2:{
                rows:3,
                columns:4,
                fieldWidth:400,
                fieldHeight:300,
                mainImage:"switcher2"
            },
            level3:{
                rows:5,
                columns:5,
                fieldWidth:320,
                fieldHeight:180,
                mainImage:"switcher3"
            },
            level4:{
                rows:5,
                columns:5,
                fieldWidth:320,
                fieldHeight:180,
                mainImage:"switcher4"
            },
            level5:{
                rows:5,
                columns:5,
                fieldWidth:320,
                fieldHeight:180,
                mainImage:"switcher5"
            },
            level6:{
                rows:5,
                columns:5,
                fieldWidth:320,
                fieldHeight:180,
                mainImage:"switcher6"
            },
            level7:{
                rows:5,//
                columns:6,///
                fieldWidth:267,
                fieldHeight:180,
                mainImage:"switcher7"
            },
            level8:{
                rows:5,//
                columns:6,///
                fieldWidth:267,
                fieldHeight:180,
                mainImage:"switcher8"
            },
            level9:{
                rows:5,//
                columns:6,///
                fieldWidth:267,
                fieldHeight:180,
                mainImage:"switcher9"
            },
            level10:{
                rows:6,
                columns:5,
                fieldWidth:320,
                fieldHeight:150,
                mainImage:"switcher10"
            },
            level11:{
                rows:6,
                columns:5,
                fieldWidth:320,
                fieldHeight:150,
                mainImage:"switcher11"
            },
            level12:{//
                rows:6,
                columns:5,
                fieldWidth:320,
                fieldHeight:150,
                mainImage:"switcher12"
            },
            level13:{
                rows:6,
                columns:6,
                fieldWidth:267,
                fieldHeight:150,
                mainImage:"switcher13"
            },
            level14:{
                rows:6,
                columns:6,
                fieldWidth:267,
                fieldHeight:150,
                mainImage:"switcher14"
            },
            level15:{
                rows:6,
                columns:6,
                fieldWidth:267,
                fieldHeight:150,
                mainImage:"switcher15"
            },
            level16:{
                rows:6,
                columns:6,
                fieldWidth:267,
                fieldHeight:150,
                mainImage:"switcher16"
            },
            level17:{
                rows:6,
                columns:6,
                fieldWidth:267,
                fieldHeight:150,
                mainImage:"switcher17"
            },
            level18:{
                rows:6,
                columns:6,
                fieldWidth:267,
                fieldHeight:150,
                mainImage:"switcher18"
            },
            level19:{
                rows:5,
                columns:8,
                fieldWidth:200,
                fieldHeight:180,
                mainImage:"switcher19"
            },
            level20:{
                rows:5,
                columns:8,
                fieldWidth:200,
                fieldHeight:180,
                mainImage:"switcher20"
            },
            level21:{
                rows:5,
                columns:8,
                fieldWidth:200,
                fieldHeight:180,
                mainImage:"switcher21"
            },
            level22:{
                rows:10,
                columns:4,
                fieldWidth:400,
                fieldHeight:90,
                mainImage:"switcher22"
            },
            level23:{//////////////////////////////
                rows:10,
                columns:4,
                fieldWidth:400,
                fieldHeight:90,
                mainImage:"switcher23"
            },
            level24:{
                rows:10,
                columns:4,
                fieldWidth:400,
                fieldHeight:90,
                mainImage:"switcher24"
            },
            level25:{
                rows:3,
                columns:15,
                fieldWidth:107,
                fieldHeight:300,
                mainImage:"switcher25"
            },
            level26:{
                rows:3,
                columns:15,
                fieldWidth:107,
                fieldHeight:300,
                mainImage:"switcher26"
            },
            level27:{
                rows:3,
                columns:15,
                fieldWidth:107,
                fieldHeight:300,
                mainImage:"switcher27"
            },
            level28:{
                rows:15,
                columns:3,
                fieldWidth:534,
                fieldHeight:60,
                mainImage:"switcher28"
            },
            level29:{
                rows:15,
                columns:3,
                fieldWidth:534,
                fieldHeight:60,
                mainImage:"switcher29"
            },
            level30:{
                rows:15,
                columns:3,
                fieldWidth:534,
                fieldHeight:60,
                mainImage:"switcher30"
            },
            level31:{
                rows:2,
                columns:21,
                fieldWidth:77,
                fieldHeight:450,
                mainImage:"switcher31"
            },
            level32:{
                rows:2,
                columns:21,
                fieldWidth:77,
                fieldHeight:450,
                mainImage:"switcher32"
            },
            level33:{
                rows:2,
                columns:21,
                fieldWidth:77,
                fieldHeight:450,
                mainImage:"switcher33"
            },
            level34:{
                rows:2,
                columns:21,
                fieldWidth:77,
                fieldHeight:450,
                mainImage:"switcher34"
            },
            level35:{
                rows:2,
                columns:21,
                fieldWidth:77,
                fieldHeight:450,
                mainImage:"switcher35"
            },
            level36:{
                rows:2,
                columns:21,
                fieldWidth:77,
                fieldHeight:450,
                mainImage:"switcher36"
            },
            level37:{
                rows:6,
                columns:8,
                fieldWidth:200,
                fieldHeight:150,
                mainImage:"switcher37"
            },
            level38:{
                rows:6,
                columns:8,
                fieldWidth:200,
                fieldHeight:150,
                mainImage:"switcher38"
            },
            level39:{
                rows:6,
                columns:8,
                fieldWidth:200,
                fieldHeight:150,
                mainImage:"switcher39"
            },
            level40:{
                rows:8,
                columns:6,
                fieldWidth:267,
                fieldHeight:113,
                mainImage:"switcher40"
            },
            level41:{
                rows:8,
                columns:6,
                fieldWidth:267,
                fieldHeight:113,
                mainImage:"switcher41"
            },
            level42:{
                rows:8,
                columns:6,
                fieldWidth:267,
                fieldHeight:113,
                mainImage:"switcher42"
            },
            level43:{
                rows:7,
                columns:8,
                fieldWidth:200,
                fieldHeight:129,
                mainImage:"switcher43"
            },
            level44:{
                rows:7,
                columns:8,
                fieldWidth:200,
                fieldHeight:129,
                mainImage:"switcher44"
            },
            level45:{
                rows:7,
                columns:8,
                fieldWidth:200,
                fieldHeight:129,
                mainImage:"switcher45"
            },
            level46:{
                rows:8,
                columns:7,
                fieldWidth:229,
                fieldHeight:113,
                mainImage:"switcher46"
            },
            level47:{
                rows:8,
                columns:7,
                fieldWidth:229,
                fieldHeight:113,
                mainImage:"switcher47"
            },
            level48:{
                rows:8,
                columns:7,
                fieldWidth:229,
                fieldHeight:113,
                mainImage:"switcher48"
            },
            level49:{
                rows:8,
                columns:8,
                fieldWidth:200,
                fieldHeight:113,
                mainImage:"switcher49"
            },
            level50:{
                rows:8,
                columns:8,
                fieldWidth:200,
                fieldHeight:113,
                mainImage:"switcher50"
            },
            level51:{
                rows:8,
                columns:8,
                fieldWidth:200,
                fieldHeight:113,
                mainImage:"switcher51"
            },
            level52:{
                rows:8,
                columns:8,
                fieldWidth:200,
                fieldHeight:113,
                mainImage:"switcher52"
            },
            level53:{
                rows:8,
                columns:8,
                fieldWidth:200,
                fieldHeight:113,
                mainImage:"switcher53"
            },
            level54:{
                rows:8,
                columns:8,
                fieldWidth:200,
                fieldHeight:113,
                mainImage:"switcher54"
            },
            level55:{
                rows:4,
                columns:19,//1064
                fieldWidth:85,//1615
                fieldHeight:225,
                mainImage:"switcher55"
            },
            level56:{
                rows:4,
                columns:19,
                fieldWidth:85,//1615
                fieldHeight:225,
                mainImage:"switcher56"
            },
            level57:{
                rows:4,
                columns:19,//1064
                fieldWidth:85,//1615
                fieldHeight:225,
                mainImage:"switcher57"
            },
            level58:{
                rows:3,
                columns:26,//1612
                fieldWidth:62,//609
                fieldHeight:300,
                mainImage:"switcher58"
            },
            level59:{
                rows:3,
                columns:26,//1066
                fieldWidth:62,//609
                fieldHeight:300,
                mainImage:"switcher59"
            },
            level60:{
                rows:3,
                columns:26,//1066
                fieldWidth:62,//609
                fieldHeight:300,
                mainImage:"switcher60"
            }
        }
    };
    
    p.getOptionsForLevel = function(level){
        const lvl = "level" + level;
        return this.options[lvl];
    };

    system.SwitcherLevelOptions = SwitcherLevelOptions;

})();