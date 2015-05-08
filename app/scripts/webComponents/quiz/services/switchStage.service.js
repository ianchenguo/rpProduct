/**
 * Created by guochen on 22/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('switchStageService', switchStageService);

  switchStageService.$inject = ['STATE', 'questionService', 'questionLevelService'];
  function switchStageService(STATE, questionService, questionLevelService) {

    var switchStage = function switchStage(questionType, questionLevelType) {

      var currentQuestion = questionService.getLocalQuestion();

      if (currentQuestion === undefined || currentQuestion.state === STATE.finished) {

        return questionService
          .createQuestion(questionType)
          .then(function () {
            return questionLevelService
              .createQuestionLevel(questionLevelType);
          });
      }
      else {

        if (currentQuestion.type !== questionType) {
          return questionLevelService
            .finishQuestionLevel()
            .then(function () {
              return questionService.finishQuestion();
            })
            .then(function () {
              return questionService.createQuestion(questionType);
            })
            .then(function () {
              return questionLevelService.createQuestionLevel(questionLevelType);
            })
        }

        else {
          return questionLevelService
            .finishQuestionLevel()
            .then(function () {
              return questionLevelService.createQuestionLevel(questionLevelType);
            });
        }
      }
    };

    var service = {
      switchStage: switchStage,
    };

    return service;
  }

}());
