/**
 * Created by guochen on 10/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuAsideFrame', ceSideMenuAsideFrame);
  ceSideMenuAsideFrame.$inject = ['$state', 'APP_MODE', '$rootScope', 'sideMenuService'];

  function ceSideMenuAsideFrame($state, APP_MODE, $rootScope, sideMenuService) {
    return {
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuAsideFrame/ceSideMenuAsideFrame.html',
      replace: true,
      scope: true,
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }
    //////
    function controller() {

      var vm = this;

      var activate = function activate() {
        //set initial side menu mode
        setSideMenuMode($state.current.name);
        //update side menu mode corresponding to navigation
        $rootScope.$on('$stateChangeStart', onStateChange);
      };

      var onStateChange = function onStateChange(event, toState, toParams, fromState, fromParams) {
        setSideMenuMode(toState.name);
      };

      var setSideMenuMode = function (stateName) {
        return R.pipe(
          extractState,
          chooseSideMenuMode,
          changeSideMenuMode)(stateName);
      };

      var changeSideMenuMode = function changeSideMenuMode(mode) {
        vm.mode = mode;
        return mode;
      };

      var chooseSideMenuMode = R.cond(
        [R.eq(APP_MODE.quiz), function () {
          return APP_MODE.quiz
        }],
        [R.T, function () {
          return APP_MODE.general
        }]
      );

      var extractState = function getMajorStatePortion(stateName) {
        return stateName.split('.')[1];
      };

      activate();
    }
  }

}());
