/**
 * Created by guochen on 4/03/A5.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .directive('ceQuestionAFrame', ceQuestionAFrame);

  ceQuestionAFrame.$inject = ['patternRandomisationService','patternMatchService'];
  function ceQuestionAFrame(patternRandomisationService, patternMatchService) {
    return {
      restrict: 'E',
      scope: {
        levelType: '@'
      },
      templateUrl: 'scripts/webComponents/questionA/directives/ceQuestionAFrameDirective/ceQuestionAFrame.html',
      controller: controller,
      controllerAs: 'vm',
      bindToController:true
    }
    //////

    function controller(){
      console.log('i am in');

      var vm = this;
      vm.showDesiredPattern = vm.levelType > 0;
      vm.showInitialArea = vm.levelType < 2;
      vm.levelCards=[];

      activate();
      //////

      function activate() {
        vm.levelCards = vm.levelType > 0 ? patternRandomisationService.pickLevelCards(vm.levelType): null;
      }
    }
  }

}());
