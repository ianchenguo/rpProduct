/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.report.router')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.report', {
        url: '/report',
        views: {
          'menuMainContent': {
            abstract: true,
            template: '<ion-nav-view></ion-nav-view>'
          }
        }
      })
      .state('app.report.quizList', {
        url: '/quizList',
        templateUrl: 'scripts/webComponents/report/components/quizList.html',
        controller: 'QuizListController as vm',
        resolve: {
          quizList: prepareQuizList
        }
      })
      .state('app.report.quizDetail', {
        url: '/quizDetail/:quizId',
        templateUrl: 'scripts/webComponents/report/components/quizDetail.html',
        controller: 'QuizDetailController as vm',
        resolve: {
          quizReport: prepareQuizReport
        }
      });

    prepareQuizList.$inject = ['$ionicLoading', 'reportService'];
    function prepareQuizList($ionicLoading, reportService) {

      $ionicLoading.show({
        template: 'loading'
      });

      return reportService.listAllEndedQuizzes()
        .then(function (value) {
          $ionicLoading.hide();
          return value;
        });
    }

    prepareQuizReport.$inject = ['$ionicLoading', 'reportService', '$stateParams'];

    function prepareQuizReport($ionicLoading, reportService, $stateParams) {

      $ionicLoading.show({
        template: 'loading'
      });

      return reportService.loadSingQuizReport($stateParams.quizId)
        .then(function (value) {
          $ionicLoading.hide();
          return value;
        });
    }
  }

}());
