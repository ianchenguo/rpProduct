/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .controller('QuestionBController', QuestionBController);

  QuestionBController.$inject = ['$stateParams'];
  function QuestionBController($stateParams) {
    var vm = this;
    vm.levelType = $stateParams.level;
  }

}());
