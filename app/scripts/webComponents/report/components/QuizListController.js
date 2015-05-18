/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.report')
    .controller('QuizListController', QuizListController);

  QuizListController.$inject = [
    '$state',
    'quizList',
    'emailComposerService'];
  function QuizListController($state,
                              quizList,
                              emailComposerService) {
    var vm = this;
    vm.quizList = R.reverse(quizList);

    vm.showDetail = showDetail;
    vm.sendEmail = sendEmail;
    vm.formatTimeStamp = formatTimeStamp;
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
  }


}());
