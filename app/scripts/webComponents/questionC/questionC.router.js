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
        controller: 'QuestionBController as vm'
        //resolve: {
        //  questionPrepService: questionPrepService
        //}
      })
      .state('app.quiz.questionB.levels', {
        url: '/levels/:level',
        templateUrl: 'scripts/webComponents/questionB/questionB.html',
        controller: 'QuestionBController as vm',
        resolve: {
          questionLevelPrepService:questionLevelPrepService
        }
      });
  }

  //////
  questionPrepService.$inject = ['QUESTION_TYPE','switchStageService'];
  function questionPrepService(QUESTION_TYPE,switchStageService) {

    return switchStageService.switchQuestion(QUESTION_TYPE.b);
  }

  questionLevelPrepService.$inject = ['QUESTION_TYPE','$stateParams', 'switchStageService'];
  function questionLevelPrepService(QUESTION_TYPE, $stateParams, switchStageService) {

    //return switchStageService.switchLevel($stateParams.level);
    return switchStageService.switchStage(QUESTION_TYPE.b, $stateParams.level);
  }

}());
