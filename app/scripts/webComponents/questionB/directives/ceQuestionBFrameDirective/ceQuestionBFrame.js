/**
 * Created by guochen on 4/03/A5.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBFrame', ceQuestionBFrame);

  function ceQuestionBFrame() {
    return {
      restrict: 'E',
      scope: {
        levelType: '@'
      },
      templateUrl: 'scripts/webComponents/questionB/directives/ceQuestionBFrameDirective/ceQuestionBFrame.html',
      controller: controller,
      controllerAs: 'vm',
      bindToController:true
    }
    //////
    function controller(){
      console.log('i am in');

      var vm = this;

    }
  }

}());
