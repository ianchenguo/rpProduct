/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.common')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questions', {
        abstract: true,
        url: '/questions',
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionsController as vm'
      })
  }
}());
