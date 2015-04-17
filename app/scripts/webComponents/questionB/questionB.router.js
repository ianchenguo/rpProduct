/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questionB', {
        url: '/questionB',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionBController as vm',
        resolve: {
          questionPrepService: questionPrepService
        }
      })
      .state('app.quiz.questionB.levels', {
        url: '/levels/:level',
        templateUrl: 'scripts/webComponents/questionB/questionB.html',
        controller: 'QuestionBController as vm',

        //views: {
        //  'result-area': {
        //    templateUrl: 'scripts/webComponents/questionB/templates/resultArea.html',
        //    controller: 'ResultAreaController'
        //  },
        //
        //  'command-list': {
        //    templateUrl: 'scripts/webComponents/questionB/templates/commandList.html',
        //    controller: 'CommandListController'
        //  }
        //},

        resolve: {
          questionLevelPrepService:questionLevelPrepService
        }
      })





  }

  //////
  questionPrepService.$inject = ['questionService', 'QUESTION_TYPE'];
  function questionPrepService(questionService, QUESTION_TYPE) {

    //creates new question object in question service, if the current question object is null
    if (!questionService.getLocalQuestion()) {
      return questionService.createQuestion(QUESTION_TYPE.b);
    }
    //finishes current question and creates a new question, if the current question exists
    else {
      return questionService
        .finishQuestion()
        .then(function () {
          return questionService.createQuestion(QUESTION_TYPE.b);
        });
    }
  }

  questionLevelPrepService.$inject = ['questionLevelService', '$stateParams'];
  function questionLevelPrepService(questionLevelService, $stateParams) {


    if (!questionLevelService.getLocalQuestionLevel()) {
      return questionLevelService.createQuestionLevel($stateParams.level);
    }
    else {
      return questionLevelService
        .finishQuestionLevel()
        .then(function () {
          return questionLevelService.createQuestionLevel($stateParams.level);
        });
    }
  }

}());
