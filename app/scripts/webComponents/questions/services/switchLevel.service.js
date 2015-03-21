/**
 * Created by guochen on 22/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .factory('switchLevelService', switchLevelService);

  switchLevelService.$inject = ['questionService','questionLevelService'];
  function switchLevelService(questionService,questionLevelService) {
    var service = {
      switchLevel:switchLevel
    };

    return service;
    //////

    function switchLevel(questionType,levelType) {
      if(questionType === questionService.getLocalQuestion().type) {
        return questionLevelService
          .finishQuestionLevel()
          .then(function(){
            return questionLevelService.createQuestionLevel(levelType);
          });
      }
    }
  }

}());
