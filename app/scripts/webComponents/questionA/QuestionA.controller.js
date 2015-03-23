/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .controller('QuestionAController', QuestionAController);

  QuestionAController.$inject = ['$state','switchStageService'];

  function QuestionAController($state,switchStageService) {
    console.log($state.current.data);
    var vm = this;
    vm.levelType = $state.current.data.levelType;
    vm.questionType = $state.current.data.questionType;
    console.log('vm.levelType: ' + vm.levelType);
    console.log('vm.questionType: ' + vm.questionType);


    activate();

    //////
    function activate() {
      return switchStageService.switchStage(vm.questionType,vm.levelType);
    }
  }
}());
