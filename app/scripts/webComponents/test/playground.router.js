/**
 * Created by guochen on 9/03/15.
 */

(function () {
  'use strict';
  angular
    .module('test.playground')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.playground', {
        url: '/playground',
        views: {
          'menuMainContent': {
            templateUrl: 'scripts/webComponents/test/playground.html',
            controller: 'PlaygroundController as vm'
          }
        }
      })
  }

}());
