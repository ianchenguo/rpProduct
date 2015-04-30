/**
 * Created by guochen on 4/03/A5.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .directive('ceQuestionAFrame', ceQuestionAFrame);

  ceQuestionAFrame.$inject = ['cardService','cardBaseService'];
  function ceQuestionAFrame(cardService, cardBaseService) {
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

      var vm = this;
      vm.showDesiredPattern = vm.levelType > 0;
      //vm.showInitialArea = vm.levelType < 2;
      vm.levelCards=[];
      vm.deployedCards = [];

      activate();
      //////

      function activate() {
        vm.levelCards = cardService.pickLevelCards(vm.levelType);
        vm.deployedCards = vm.levelType > 0 ? cardService.pickDeployedCards(vm.levelCards, _.parseInt(vm.levelType)) : [];
        cardBaseService.setDesiredPattern(vm.levelCards);
        cardBaseService.setInitPattern(vm.deployedCards);
      }
    }
  }

}());
