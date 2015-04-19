/**
 * Created by guochen on 9/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.layout')
    .controller('LayoutController', LayoutController);

  function LayoutController($scope, $timeout, $mdSidenav, $log) {
    var vm = this;
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');

    vm.closeLeft = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };

    vm.closeRight = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {

      console.log('I am iinnn');
      return function() {
        return $mdSidenav(navID).toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }


  }

}());
