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
    '$mdToast'];
  function ceSideMenuAsideQuiz($state,
                               questionLevelService,
                               questionService,
                               quizService,
                               audioRecordingService,
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
      vm.endQuiz = endQuiz;
      //vm.test = _showRecordEndingToast;
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
        audioRecordingService.stopRecord();
        _showRecordEndingToast();
      }
    }

    function _showRecordEndingToast() {
      $mdToast.show(
        $mdToast.simple()
          .content('Audio recording finished!')
          .position('false true false true')
          .hideDelay(3000)
      );
    }
  }

}());
