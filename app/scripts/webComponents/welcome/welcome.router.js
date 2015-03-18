/**
 * Created by guochen on 9/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.welcome')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.welcome', {
        url: '/welcome',
        views: {
          'menuMainContent': {
            templateUrl: 'scripts/webComponents/welcome/welcome.html',
            controller: 'WelcomeController as vm'
          }
        }
      })
  }

}());

