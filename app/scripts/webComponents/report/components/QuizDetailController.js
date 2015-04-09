/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.report')
    .controller('QuizDetailController', QuizDetailController);

  QuizDetailController.$inject = ['quizReport'];
  function QuizDetailController(quizReport) {
    var vm = this;
    vm.quizReport = quizReport;

  }


}());
