/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceDesiredPattern', ceDesiredPattern);

  //////
  function ceDesiredPattern() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceDesiredPattern/ceDesiredPattern.html',
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
        {id: 'q-a-p-01', content: 'A', color: 'red'},
        {id: 'q-a-p-02', content: 'B', color: 'green'},
        {id: 'q-a-p-03', content: 'C', color: 'blue'}
      ]
    }
  }

}());
