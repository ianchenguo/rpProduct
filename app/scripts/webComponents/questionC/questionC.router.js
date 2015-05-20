/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questionC', {
        url: '/questionC',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionCController as vm'
      })
      .state('app.quiz.questionC.levels', {
        url: '/levels/:level',
        templateUrl: 'scripts/webComponents/questionC/questionC.html',
        controller: 'QuestionCController as vm',
        resolve: {
          questionLevelPrepService:questionLevelPrepService
        }
      });
  }

  //////
  questionLevelPrepService.$inject = ['$ionicLoading', 'QUESTION_TYPE', '$stateParams', 'switchStageService'];
  function questionLevelPrepService($ionicLoading, QUESTION_TYPE, $stateParams, switchStageService) {

    $ionicLoading.show({
      template: 'loading'
    });

    return switchStageService
      .switchStage(QUESTION_TYPE.c, $stateParams.level)
      .then(function(value){
        $ionicLoading.hide();
        return value;
      });
  }

}());
