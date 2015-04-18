/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceCardNew', ceCardNew);

  //////
  function ceCardNew() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceCardNew/ceCardNew.html',
      scope: {
        cardImgUrl:'@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    }

    //////
    function controller() {
      var vm = this;
      console.log(vm.cardImgUrl);
    }
  }

}());
