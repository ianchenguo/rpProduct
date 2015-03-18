/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.questionA')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questions.a', {
        abstract: true,
        url: '/a',
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionAController as vm',
        data:{question:'a'}
      })
      .state('app.quiz.questions.a.level0', {
        url: '/level0',
        templateUrl: 'quiz/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data:{level:0}
      })
      .state('app.quiz.questions.a.level1', {
        url: '/level1',
        templateUrl: 'quiz/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data:{level:1}
      })
      .state('app.quiz.questions.a.level2', {
        url: '/level2',
        templateUrl: 'quiz/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        data:{level:2}
      })
  }

}());
