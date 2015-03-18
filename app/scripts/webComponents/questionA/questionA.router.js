/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.questionA')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider','QUESTION_TYPE','LEVEL_TYPE'];
  function routeConfig($stateProvider,QUESTION_TYPE,LEVEL_TYPE) {

    $stateProvider
      .state('app.quiz.questions.a', {
        abstract: true,
        url: '/a',
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionAController as vm',
        data:{question:QUESTION_TYPE.a}
      })
      .state('app.quiz.questions.a.zero', {
        url: '/level0',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data:{level:LEVEL_TYPE.zero}
      })
      .state('app.quiz.questions.a.one', {
        url: '/level1',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data:{level:LEVEL_TYPE.one}
      })
      .state('app.quiz.questions.a.two', {
        url: '/level2',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data:{level:LEVEL_TYPE.two}
      })
  }

}());
