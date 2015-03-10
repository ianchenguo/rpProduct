/**
 * Created by guochen on 9/03/15.
 */

//(function () {
//  'use strict';
//  angular
//    .module('app.quiz')
//    .config(config);
//
//  config.$inject = ['$stateProvider', '$urlRouterProvider'];
//  function config($stateProvider, $urlRouterProvider) {
//
//    $stateProvider
//      .state('app.quiz', {
//        url: '/quiz',
//        abstract: true,
//        views: {
//          'menuContent': {
//            template: '<ion-nav-view></ion-nav-view>',
//            controller: 'QuizController as vm'
//          }
//        }
//      })
//      .state('app.info', {
//        url: '/info',
//        views: {
//          'menuContent': {
//            templateUrl: 'quiz/info/quizInfo.html',
//            controller: 'QuizInfoController as vm'
//          }
//        }
//      })
//  }
//
//}());

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
      .state('app.quiz.info',{
        url:'/info',
        templateUrl:'quiz/info/quizInfo.html',
        controller: 'QuizInfoController as vm'
      })
  }

}());
