/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .controller('QuestionCController', QuestionCController);

  QuestionCController.$inject = ['$stateParams','QUESTION_TYPE'];
  function QuestionCController($stateParams,QUESTION_TYPE) {
    var vm = this;
    vm.levelType = $stateParams.level;
    vm.questionType = QUESTION_TYPE.c;
  }

}());
