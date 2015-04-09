/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.report')
    .controller('QuizListController', QuizListController);

  QuizListController.$inject = ['$state','quizList'];
  function QuizListController($state,quizList) {
    var vm = this;
    vm.quizList = quizList;

    vm.showDetail = showDetail;
    vm.formatTimeStamp = formatTimeStamp;
    //////
    function showDetail(quizId) {
      $state.go('app.report.quizDetail',{quizId:quizId});
    }

    function formatTimeStamp(timeStamp) {
      return new Date(timeStamp);
    }
  }


}());
