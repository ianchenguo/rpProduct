/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuAsideQuiz', ceSideMenuAsideQuiz);

  ceSideMenuAsideQuiz.$inject = [
    '$state',
    'questionLevelService',
    'questionService',
    'quizService',
    'audioRecordingService',
    'sideMenuService',
    'readableLogService',
    '$mdToast',
    '$mdDialog'];
  function ceSideMenuAsideQuiz($state,
                               questionLevelService,
                               questionService,
                               quizService,
                               audioRecordingService,
                               sideMenuService,
                               readableLogService,
                               $mdToast,
                               $mdDialog) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuAsideQuiz/ceSideMenuAsideQuiz.html',
      scope: {},
      controllerAs: 'vm',
      controller: ['$scope', controller],
      bindToController: true
    };

    function controller($scope) {

      var vm = this;


      var toggleStage = function toggleStage(stage) {
        stage.isShown = !stage.isShown;

        if (stage.isShown == true) {
          if (stage != sideMenuService.getExpandedStage()) {
            sideMenuService.getExpandedStage().isShown = false;
            sideMenuService.setExpandedStage(stage);
          }
        }

      };

      var conditionalToggle = function conditionalToggle(toggleFunc, stage) {

        return R.cond(
          [R.compose(R.not, R.eq('exploration stage'), R.prop('name')), toggleFunc]
        )(stage);
      };

      var curriedConditionalToggle = R.curry(conditionalToggle);

      var isStageShown = function isStateShown(stage) {
        return stage.isShown;
      };

      function modifyQuizInfo() {
        $mdDialog.show({
          clickOutsideToClose: false,
          scope: $scope,
          preserveScope: true,
          templateUrl: 'scripts/webComponents/quizInfo/popupQuizInfo.html',
          controller: function DialogController($scope, $mdDialog) {

            $scope.quiz = quizService.getLocalQuiz();
            $scope.gender = ['male', 'female'];

            $scope.closeDialog = function () {
              $mdDialog.cancel();
            };
            $scope.run = function () {

              $mdDialog.hide().then(function () {
                  quizService.updateQuizInfo();
              });
            }
          }
        });
      }

      vm.modifyQuizInfo = modifyQuizInfo;

      vm.questions = sideMenuService.getAllStages();
      vm.activateStage = sideMenuService.activateStage;
      vm.endQuiz = endQuiz;
      vm.toggleStage = curriedConditionalToggle(toggleStage);
      vm.isStageShown = isStageShown;
      vm.reload = function reloadState() {
        $state.go($state.current, {}, {reload: true});

      };
    }


    //////
    function endQuiz() {
      return questionLevelService
        .finishQuestionLevel()
        .then(function () {
          return questionService.finishQuestion();
        })
        .then(function () {
          return quizService.finishQuiz();
        })
        .then(function () {
          _stopRecording();
          $state.go('app.welcome');
        })
    }

    function _stopRecording() {
      if (audioRecordingService.isRecording()) {
        audioRecordingService.stopRecord().then(function () {
          readableLogService.saveLog(
            readableLogService.createAudioLog('audioRecordingFinished', {})
          );
          _showRecordEndingToast();
        });
      }
    }

    function _showRecordEndingToast() {
      $mdToast.show(
        $mdToast.simple()
          .content('Audio recording finished!')
      );
    }
  }

}());
