/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.welcome')
    .controller('WelcomeController', WelcomeController);

  WelcomeController.$inject = [
    '$state',
    '$mdDialog',
    '$mdToast',
    'audioRecordingService'];
  function WelcomeController($state,
                             $mdDialog,
                             $mdToast,
                             audioRecordingService) {
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
      $mdDialog.show(confirm).then(function () {

        audioRecordingService.startRecord('documents://tempQuizAudio.m4a');
        _showRecordEndingToast();
        $state.go('app.quizInfo');

      }, function () {
        $state.go('app.quizInfo');
      });
    };

    function _showRecordEndingToast() {
      $mdToast.show(
        $mdToast.simple()
          .content('Audio recording started!')
          .position('false true false true')
          .hideDelay(3000)
      );
    }

    vm.startQuiz = startQuiz;


    //////


    function startQuiz(ev) {
      //_showConfirm(ev);
      $state.go('app.quizInfo');

    }


  }
}());
