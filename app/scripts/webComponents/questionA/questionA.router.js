/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questionA', {
        url: '/questionA',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionAController as vm',
        resolve: {
          questionPrepService: questionPrepService
        }
      })
      .state('app.quiz.questionA.levels', {
        url: '/levels/:level',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionAController as vm',
        resolve: {
          questionLevelPrepService: questionLevelPrepService
        }
      })
      .state('app.quiz.questionA.levels.directions', {
        url: '/directions/:direction',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        resolve: {
          directionPrepare:directionPrepare
        }
      })
  }

  //////
  questionPrepService.$inject = ['questionService', 'QUESTION_TYPE'];
  function questionPrepService(questionService, QUESTION_TYPE) {

    //creates new question object in question service, if the current question object is null
    if (!questionService.getLocalQuestion()) {
      return questionService.createQuestion(QUESTION_TYPE.a);
    }
    //finishes current question and creates a new question, if the current question exists
    else {
      return questionService
        .finishQuestion()
        .then(function () {
          return questionService.createQuestion(QUESTION_TYPE.a);
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

  directionPrepare.$inject = ['$stateParams','patternMatchService'];
  function directionPrepare($stateParams,patternMatchService){
    return patternMatchService.initMatch('',$stateParams.direction);
  }

}());
