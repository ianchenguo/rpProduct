/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('ceDesiredPattern', ceDesiredPattern);

  //////
  function ceDesiredPattern() {
    return {
      restrict: 'E',
      templateUrl: 'quiz/questions/common/directives/ceDesiredPattern/ceDesiredPattern.html',
      scope: {
        content: '@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    }

    //////
    function controller() {
      var vm = this;

      //the desired pattern contains three components
      vm.components = [
        {
          content: 'A'
        }, {
          content: 'B'
        }, {
          content: 'C'
        }];
    }
  }

}());
