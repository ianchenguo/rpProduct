/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questionC', {
        url: '/questionC',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionCController as vm'
        //resolve: {
        //  questionPrepService: questionPrepService
        //}
      })
      .state('app.quiz.questionC.levels', {
        url: '/levels/:level',
        templateUrl: 'scripts/webComponents/questionC/questionC.html',
        controller: 'QuestionCController as vm',
        resolve: {
          questionLevelPrepService:questionLevelPrepService
        }
      });
  }

  //////
  questionPrepService.$inject = ['QUESTION_TYPE','switchStageService'];
  function questionPrepService(QUESTION_TYPE,switchStageService) {

    return switchStageService.switchQuestion(QUESTION_TYPE.c);
  }

  questionLevelPrepService.$inject = ['QUESTION_TYPE','$stateParams', 'switchStageService'];
  function questionLevelPrepService(QUESTION_TYPE, $stateParams, switchStageService) {

    //return switchStageService.switchLevel($stateParams.level);
    return switchStageService.switchStage(QUESTION_TYPE.c, $stateParams.level);
  }

}());
