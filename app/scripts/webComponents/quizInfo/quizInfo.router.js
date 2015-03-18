/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.info')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.info', {
        url: '/info',
        templateUrl: 'scripts/webComponents/quizInfo/quizInfo.html',
        controller: 'QuizInfoController as vm'
      })
  }

}());
