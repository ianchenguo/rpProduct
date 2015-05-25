/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quizInfo')
    .controller('QuizInfoController', QuizInfoController);

  QuizInfoController.$inject = [
    '$mdToast',
    '$mdDialog',
    '$ionicViewSwitcher',
    '$q',
    '$state',
    'audioRecordingService',
    'quizService',
    'LEVEL_TYPE',
    'sideMenuService',
    'readableLogService'];
  function QuizInfoController($mdToast,
                              $mdDialog,
                              $ionicViewSwitcher,
                              $q,
                              $state,
                              audioRecordingService,
                              quizService,
                              LEVEL_TYPE,
                              sideMenuService,
                              readableLogService) {
    var vm = this;

    var _showConfirm = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Would you like to let the app record audio?')
        .content('This app can record audio in background during the quiz session')
        .ariaLabel('Audio Recording Confirmation')
        .ok('Permit')
        .cancel('Deny')
        .targetEvent(ev);
      $mdDialog.show(confirm)
        .then(function () {
          audioRecordingService.startRecord('documents://tempQuizAudio.m4a');
          readableLogService.saveLog(
            readableLogService.createAudioLog('audioRecordingStart', {})
          );
          _showRecordEndingToast();


        })
        .finally(function () {
          submitInfo();
        });
    };

    function _showRecordEndingToast() {
      $mdToast.show(
        $mdToast.simple()
          .content('Audio recording started!')
      );
    }

    vm.child = {fullNameOrCode: '', age: '', gender: '', institution: ''};
    vm.observer = {fullNameOrCode: '', email: ''};
    vm.gender = ['male', 'female'];

    vm.submitInfo = submitInfo;
    vm.go = go;

    //////

    function go(ev) {
      _showConfirm(ev);
    }

    function submitInfo() {

      return quizService
        .createQuiz(vm.child, vm.observer)
        .then(handleSuccess)
        .catch(handleError);

      ///
      function handleSuccess(value) {

        sideMenuService.activateStage(
          sideMenuService.getAllStages()[0].stages[0]
        );

        sideMenuService.getExpandedStage().isShown = false;
        sideMenuService.setExpandedStage({});

        $ionicViewSwitcher.nextTransition('none');
        $state.go('app.quiz.questionA.levels', {level: LEVEL_TYPE.zero});
        return value;
      }

      function handleError(error) {
        $q.reject(error);
      }
    }

  }

}());
