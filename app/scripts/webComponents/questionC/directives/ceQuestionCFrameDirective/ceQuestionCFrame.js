/**
 * Created by guochen on 4/03/A5.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .directive('ceQuestionCFrame', ceQuestionCFrame);

  function ceQuestionCFrame() {
    return {
      restrict: 'E',
      scope: {
        levelType: '@',
        questionType: '@'
      },
      templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCFrameDirective/ceQuestionCFrame.html',
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    }
    //////
    function controller() {
      var vm = this;

    }
  }

}());
