/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quizInfo')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quizInfo', {
        url: '/quizInfo',
        views: {
          'menuMainContent': {
            templateUrl: 'scripts/webComponents/quizInfo/quizInfo.html',
            controller: 'QuizInfoController as vm'
          }
        }
      })
  }

}());
