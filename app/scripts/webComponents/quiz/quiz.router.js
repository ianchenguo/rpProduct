/**
 * Created by guochen on 12/03/15.
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
        url: '/quiz',
        views: {
          'menuMainContent': {
            abstract: true,
            template: '<ion-nav-view></ion-nav-view>'
          }
        }
      })
  }

}());
