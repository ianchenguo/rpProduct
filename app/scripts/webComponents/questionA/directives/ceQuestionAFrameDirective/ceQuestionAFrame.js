/**
 * Created by guochen on 4/03/A5.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.questionA')
    .directive('ceQuestionAFrame', ceQuestionAFrame);

  function ceQuestionAFrame() {
    return {
      restrict: 'E',
      scope: {
        level: '@'
      },
      templateUrl: 'scripts/webComponents/questionA/directives/ceQuestionAFrameDirective/ceQuestionAFrame.html',
      controller: controller,
      controllerAs: 'vm',
      bindToController:true
    }
    //////
    function controller(){
      var vm = this;

      vm.showDesiredPattern = vm.level > 0;
      console.log('vm.level: ' + vm.level);
      console.log('vm.showDesiredPattern: ' + vm.showDesiredPattern);

      vm.showInitialArea = vm.level < 2;
      console.log('vm.showInitialArea: ' + vm.showInitialArea);
    }
  }

}());
