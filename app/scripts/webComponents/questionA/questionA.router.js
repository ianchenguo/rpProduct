/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', 'QUESTION_TYPE', 'LEVEL_TYPE'];
  function routeConfig($stateProvider, QUESTION_TYPE, LEVEL_TYPE) {

    $stateProvider
      .state('app.quiz.questionA', {
        url: '/questionA',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionAController as vm'
      })
      .state('app.quiz.questionA.level0', {
        url: '/level0',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data: {questionType: QUESTION_TYPE.a, levelType: LEVEL_TYPE.zero}
      })
      .state('app.quiz.questionA.level1', {
        url: '/level1',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data: {questionType: QUESTION_TYPE.a, levelType: LEVEL_TYPE.one}
      })
      .state('app.quiz.questionA.level2', {
        url: '/level2',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data: {questionType: QUESTION_TYPE.a, levelType: LEVEL_TYPE.two}
      });
  }

}());
