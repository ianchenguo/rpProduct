/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBTestArea', ceQuestionBTestArea);

  ceQuestionBTestArea.$inject = ['patternRandomisationService'];
  function ceQuestionBTestArea(patternRandomisationService){
    return {
      restrict: 'E',
      templateUrl:'scripts/webComponents/questionB/directives/ceQuestionBTestAreaDirective/ceQuestionBTestArea.html',
      scope: {
        levelType:"@"
      },
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    };


    //////
    function controller(){
      var vm = this;
      vm.showDesiredPattern = vm.levelType > 0;
      vm.levelCards=[];

      activate();
      //////

      function activate() {
        vm.levelCards = patternRandomisationService.pickLevelCards(vm.levelType);
      }
    }
  }

}());
