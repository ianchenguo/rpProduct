/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuAsideQuiz', ceSideMenuAsideQuiz);

  function ceSideMenuAsideQuiz(){
    return {
      restrict: 'E',
      templateUrl:'scripts/webComponents/sideMenu/directives/ceSideMenuAsideQuiz/ceSideMenuAsideQuiz.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }


    //////
    function controller(){
      var vm = this;

    }
  }

}());
