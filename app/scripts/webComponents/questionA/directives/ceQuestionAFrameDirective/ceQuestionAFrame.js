/**
 * Created by guochen on 4/03/A5.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .directive('ceQuestionAFrame', ceQuestionAFrame);

  function ceQuestionAFrame() {
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
      console.log('vm.level: ' + vm.levelType);
      console.log('vm.showDesiredPattern: ' + vm.showDesiredPattern);

      vm.showInitialArea = vm.levelType < 2;
      console.log('vm.showInitialArea: ' + vm.showInitialArea);
    }
  }

}());
