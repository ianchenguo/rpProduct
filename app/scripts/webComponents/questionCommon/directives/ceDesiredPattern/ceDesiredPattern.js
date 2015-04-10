/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceDesiredPattern', ceDesiredPattern);

  function ceDesiredPattern() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceDesiredPattern/ceDesiredPattern.html',
      scope: {
        content: '@',
        level: '@',
        levelCards: '='
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    };

    //////
    function controller() {
      var vm = this;

      //////




    }
  }

}());
