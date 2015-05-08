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
        controller: 'QuestionAController as vm'
        //resolve: {
        //  questionPrepService: questionPrepService
        //}
      })
      .state('app.quiz.questionA.levels', {
        url: '/levels/:level',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        resolve: {
          questionLevelPrepService: questionLevelPrepService
        }
      })
  }

  //////
  questionPrepService.$inject = ['QUESTION_TYPE','switchStageService'];
  function questionPrepService(QUESTION_TYPE,switchStageService) {

    return switchStageService.switchQuestion(QUESTION_TYPE.a);
  }

  questionLevelPrepService.$inject = ['QUESTION_TYPE','$stateParams', 'switchStageService'];
  function questionLevelPrepService(QUESTION_TYPE, $stateParams, switchStageService) {

    //return switchStageService.switchLevel($stateParams.level);
    return switchStageService.switchStage(QUESTION_TYPE.a, $stateParams.level);
  }

}());
