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
    '$mdToast'];
  function ceSideMenuAsideQuiz($state,
                               questionLevelService,
                               questionService,
                               quizService,
                               audioRecordingService,
                               sideMenuService,
                               $mdToast) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuAsideQuiz/ceSideMenuAsideQuiz.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    };

    function controller() {

      var vm = this;


      var toggleStage = function toggleStage(stage) {
        stage.isShown = !stage.isShown;
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
