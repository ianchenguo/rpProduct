/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .controller('QuestionAController', QuestionAController);

  QuestionAController.$inject = ['$stateParams','QUESTION_TYPE'];
  function QuestionAController($stateParams,QUESTION_TYPE) {
    var vm = this;
    vm.levelType = $stateParams.level;
    vm.questionType = QUESTION_TYPE.a;

  }

}());
