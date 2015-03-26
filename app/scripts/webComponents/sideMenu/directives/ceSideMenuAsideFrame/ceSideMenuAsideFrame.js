/**
 * Created by guochen on 10/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuAsideFrame', ceSideMenuAsideFrame);

  function ceSideMenuAsideFrame() {
    return {
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuAsideFrame/ceSideMenuAsideFrame.html',
      replace:true,
      scope:true,
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }
    //////
    controller.$inject = ['$state','APP_MODE', '$rootScope']
    function controller($state,APP_MODE, $rootScope) {
      var vm = this;
      vm.mode = APP_MODE.general;



      $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
          //console.log($state.current.name);
          //console.log(toState);
          var modePrefix = toState.name.split('.')[1];
          //console.log('modePrefix '+ modePrefix);

          if(modePrefix === 'quiz') {
            vm.mode = APP_MODE.quiz;
          } else if(modePrefix === 'replay') {
            vm.mode = APP_MODE.replay;
          } else {
            vm.mode = APP_MODE.general;
          }
        })






    }
  }

}());
