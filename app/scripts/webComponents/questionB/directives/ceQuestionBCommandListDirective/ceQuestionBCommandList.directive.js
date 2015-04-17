/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBCommandList', ceQuestionBCommandList);

  function ceQuestionBCommandList(){
    return {
      restrict: 'E',
      templateUrl:'scripts/webComponents/questionB/directives/ceQuestionBCommandListDirective/ceQuestionBCommandList.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }


    //////
    function controller(){
      var vm = this;
      vm.commands = [];
      vm.addCommand = addCommand;
      vm.deleteLastCommand = deleteLastCommand;

      //////
      function addCommand() {
        var command = {from:'', to:''};
        vm.commands.push(command);
      }

      function deleteLastCommand() {
        vm.commands.pop();
      }

    }
  }

}());
