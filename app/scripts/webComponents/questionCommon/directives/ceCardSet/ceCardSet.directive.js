/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceCardSet', ceCardSet);

  function ceCardSet() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceCardSet/ceCardSet.html',
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

    }
  }

}());
