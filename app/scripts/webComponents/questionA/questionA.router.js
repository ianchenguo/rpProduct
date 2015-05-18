/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {

    $stateProvider
      .state('app.quiz.questionA', {
        url: '/questionA',
        abstract: true,
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'QuestionAController as vm'
      })
      .state('app.quiz.questionA.levels', {
        url: '/levels/:level',
        templateUrl: 'scripts/webComponents/questionA/questionA.html',
        controller: 'QuestionAController as vm',
        resolve: {
          questionLevelPrepService: questionLevelPrepService
        }
      })
  }

  //////
  questionLevelPrepService.$inject = ['$ionicLoading', 'QUESTION_TYPE', '$stateParams', 'switchStageService'];
  function questionLevelPrepService($ionicLoading, QUESTION_TYPE, $stateParams, switchStageService) {

    $ionicLoading.show({
      template: 'loading'
    });

    return switchStageService
      .switchStage(QUESTION_TYPE.a, $stateParams.level)
      .then(function(value){
        $ionicLoading.hide();
        return value;
      });
  }

}());
