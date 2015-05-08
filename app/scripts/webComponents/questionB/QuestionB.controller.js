/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .controller('QuestionBController', QuestionBController);

  QuestionBController.$inject = ['$stateParams','QUESTION_TYPE'];
  function QuestionBController($stateParams,QUESTION_TYPE) {
    var vm = this;
    vm.levelType = $stateParams.level;
    vm.questionType = QUESTION_TYPE.b;
  }

}());
