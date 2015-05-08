/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuAsideGeneral', ceSideMenuAsideGeneral);

  function ceSideMenuAsideGeneral(){
    return {
      restrict: 'E',
      templateUrl:'scripts/webComponents/sideMenu/directives/ceSideMenuAsideGeneral/ceSideMenuAsideGeneral.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }


    //////
    function controller(){
      var vm = this;

      ionic.material.ink.displayEffect();
    }
  }

}());
