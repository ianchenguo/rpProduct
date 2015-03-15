/**
 * Created by guochen on 9/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz', {
        abstract: true,
        url: '/quiz',
        views: {
          'menuMainContent': {

            template: '<ion-nav-view></ion-nav-view>',
            controller: 'QuizController as vm'
          }
        }
      })
  }
}());
