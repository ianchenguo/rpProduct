/**
 * Created by guochen on 20/05/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .factory('sideMenuService',sideMenuService);

  function sideMenuService(){
    var _activeStage = {};
    var _expandedStage = {};

    var _stages = [
      {
        name: 'Level 1',
        stages: [
          {
            name: 'exploration stage',
            subStages: [],
            link: 'app.quiz.questionA.levels({level:0})',
            isActive:false
          },
          {
            name: 'intermediate stage',
            subStages: [
              {
                name: 'left shift',
                link: 'app.quiz.questionA.levels({level:1})',
                isActive:false

              }, {
                name: 'right shift',
                link: 'app.quiz.questionA.levels({level:2})',
                isActive:false

              }, {
                name: 'asymmetry swap',
                link: 'app.quiz.questionA.levels({level:3})',
                isActive:false
              }
            ],
            link: '',
            isExpanded:false
          }
        ]
      },
      {
        name: 'Level 2',
        stages: [
          {
            name: 'exploration stage',
            subStages: [],
            link: 'app.quiz.questionB.levels({level:0})',
            isActive:false
          },
          {
            name: 'intermediate stages',
            subStages: [
              {
                name: 'left shift',
                link: 'app.quiz.questionB.levels({level:1})',
                isActive:false
              }, {
                name: 'right shift',
                link: 'app.quiz.questionB.levels({level:2})',
                isActive:false
              }, {
                name: 'asymmetry swap',
                link: 'app.quiz.questionB.levels({level:3})',
                isActive:false
              }
            ],
            link: '',
            isExpanded:false
          },
          {
            name: 'advanced stages',
            subStages: [
              {
                name: 'left shift',
                link: 'app.quiz.questionB.levels({level:4})',
                isActive:false
              }, {
                name: 'right shift',
                link: 'app.quiz.questionB.levels({level:5})',
                isActive:false
              }, {
                name: 'asymmetry swap',
                link: 'app.quiz.questionB.levels({level:6})',
                isActive:false
              }
            ],
            link: '',
            isExpanded:false
          }
        ]
      },
      {
        name: 'Level 3',
        stages: [
          {
            name: 'exploration stage',
            subStages: [],
            link: 'app.quiz.questionC.levels({level:0})',
            isActive:false
          },
          {
            name: 'intermediate stages',
            subStages: [
              {
                name: 'left shift',
                link: 'app.quiz.questionC.levels({level:1})',
                isActive:false
              }, {
                name: 'right shift',
                link: 'app.quiz.questionC.levels({level:2})',
                isActive:false
              }, {
                name: 'asymmetry swap',
                link: 'app.quiz.questionC.levels({level:3})',
                isActive:false
              }
            ],
            link: '',
            isExpanded:false
          },
          {
            name: 'advanced stages',
            subStages: [
              {
                name: 'left shift',
                link: 'app.quiz.questionC.levels({level:4})',
                isActive:false
              }, {
                name: 'right shift',
                link: 'app.quiz.questionC.levels({level:5})',
                isActive:false
              }, {
                name: 'asymmetry swap',
                link: 'app.quiz.questionC.levels({level:6})',
                isActive:false
              }
            ],
            link: ''

          }
        ]
      }
    ];

    var getActiveStage = function getActiveStage(){
      return _activeStage;
    };

    var setActiveStage = function setActiveStage(stage){
      _activeStage = stage;
    };

    var getAllStages = function getAllStages(){
      return _stages;
    };

    var activateStage = function(stage){

      if(!R.isNil(getActiveStage())) {
        getActiveStage().isActive = false;
      }
      stage.isActive = true;
      setActiveStage(stage);
    };

    var getExpandedStage = function getExpandedStage() {
      return _expandedStage;
    };

    var setExpandedStage = function setExpandedStage(stage) {
      _expandedStage = stage;
    };

    var expandStage = function expandStage(stage){

      if(!R.isNil(getExpandedStage())) {
        getExpandedStage().isExpended = false;
      }
      stage.isExpended = true;
      setExpandedStage(stage);
    };



    var service = {
      getActiveStage:getActiveStage,
      setActiveStage:setActiveStage,
      getAllStages:getAllStages,
      activateStage:activateStage,
      getExpandedStage:getExpandedStage,
      setExpandedStage:setExpandedStage
    };

    return service;

  }


}());
