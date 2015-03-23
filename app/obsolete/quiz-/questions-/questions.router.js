/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questions', {
        abstract: true,
        url: '/questionCommon',
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionsController as vm'
      })
  }
}());
