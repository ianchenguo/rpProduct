/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questionB', {
        url: '/questionB',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionBController as vm'
      })
      .state('app.quiz.questionB.levels', {
        url: '/levels/:level',
        templateUrl: 'scripts/webComponents/questionB/questionB.html',
        controller: 'QuestionBController as vm',
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
      .switchStage(QUESTION_TYPE.b, $stateParams.level)
      .then(function(value){
        $ionicLoading.hide();
        return value;
      });
  }

}());
