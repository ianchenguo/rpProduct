/**
 * Created by guochen on 22/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('switchStageService', switchStageService);

  switchStageService.$inject = ['LEVEL_TYPE', 'questionService', 'questionLevelService'];
  function switchStageService(LEVEL_TYPE, questionService, questionLevelService) {

    var service = {
      switchStage: switchStage
      //,resumeStage: resumeStage
    };

    return service;
    //////

    function switchStage(questionType, levelType) {

      //creates level 0 of target question type, if there is no question created yet
      if (!questionService.getLocalQuestion()) {
        return _createQuestionAndLevel(questionType);
      }

      //finishes current level and creates a new level of current question type,
      // if target question type is as same as current question
      if (questionLevelService.getLocalQuestionLevel() &&
        questionType === questionService.getLocalQuestion().type) {
        return _finishAndCreateLevel(levelType);
      }
    }

    function _createQuestionAndLevel(questionType) {
      return questionService
        .createQuestion(questionType)
        .then(function () {
          return questionLevelService.createQuestionLevel(LEVEL_TYPE.zero);
        });
    }

    function _finishAndCreateLevel(levelType) {
      return questionLevelService
        .finishQuestionLevel()
        .then(function () {
          return questionLevelService.createQuestionLevel(levelType);
        });
    }


  }

}());
