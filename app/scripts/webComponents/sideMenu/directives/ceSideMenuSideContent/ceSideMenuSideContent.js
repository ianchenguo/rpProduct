/**
 * Created by guochen on 10/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuSideContent', ceSideMenuSideContent);

  function ceSideMenuSideContent() {
    return {
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuSideContent/ceSideMenuSideContent.html',
      replace:true
    }
  }

}());
