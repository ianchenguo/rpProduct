/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.report')
    .controller('QuizListController', QuizListController);

  QuizListController.$inject = [
    '$ionicLoading',
    '$mdToast',
    '$mdDialog',
    '$state',
    'quizList',
    'emailComposerService',
    'reportService',
    'fileService'];
  function QuizListController($ionicLoading,
                              $mdToast,
                              $mdDialog,
                              $state,
                              quizList,
                              emailComposerService,
                              reportService,
                              fileService) {
    var vm = this;

    var _showConfirm = function (quizId, ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Are you sure to delete quiz data')
        .content('All related data to this quiz will be deleted.')
        .ariaLabel('Quiz Deleting Confirmation')
        .ok('Yes')
        .cancel('No')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function () {
        $ionicLoading.show({
          template: 'deleting'
        });
        return deleteQuizDocs(quizId)
          .then(function () {
            fileService.removeFile(
              fileService.getAudioFilePath(quizId)
            );
            fileService.removeFile(
              fileService.getLogFilePath(quizId)
            );
          })
          .then(function () {

            vm.quizList = R.reject(function (item) {
              return item.id === quizId
            }, vm.quizList);

            _showRecordEndingToast('Successfully deleted!');

          })
          .catch(function () {
            _showRecordEndingToast('Error occurred in quiz deletion!');
          })
          .finally(function () {
            $ionicLoading.hide();
          });
      });
    };

    function _showRecordEndingToast(content) {
      $mdToast.show(
        $mdToast.simple()
          .content(content)
      );
    }

    vm.quizList = R.reverse(quizList);

    vm.showDetail = showDetail;
    vm.sendEmail = sendEmail;
    vm.formatTimeStamp = formatTimeStamp;
    vm.deleteQuiz = deleteQuiz;
    vm.compactDatabase = compactDatabase;
    //////
    function showDetail(quizId) {
      $state.go('app.report.quizDetail', {quizId: quizId});
    }

    function formatTimeStamp(timeStamp) {
      return new Date(timeStamp);
    }

    function sendEmail(quizId) {
      emailComposerService.openEmail(quizId);
    }

    function deleteQuiz(quizId, ev) {
      _showConfirm(quizId, ev);
    }

    function deleteQuizDocs(quizId) {
      return reportService.deleteAllDocsOfQuiz(quizId);
    }

    function compactDatabase(ev) {
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Are you sure to compact database?')
        .content('Collect space from deleted quiz records.')
        .ariaLabel('Database Compact Confirmation')
        .ok('Yes')
        .cancel('No')
        .targetEvent(ev);

      $mdDialog.show(confirm).then(function () {
        $ionicLoading.show({
          template: 'compacting'
        });

        reportService.compactDatabase()
          .then(function () {
            _showRecordEndingToast('Successfully compacted!');
          })
          .catch(function () {
            _showRecordEndingToast('Error occurred in database compacting!');
          })
          .finally(function () {
            $ionicLoading.hide();
          });
      });
    }

  }
}());
