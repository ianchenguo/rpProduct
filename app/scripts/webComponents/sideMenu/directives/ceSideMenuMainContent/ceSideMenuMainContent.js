/**
 * Created by guochen on 10/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuMainContent', ceSideMenuMainContent);

  function ceSideMenuMainContent() {
    return {
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuMainContent/ceSideMenuMainContent.html',
      replace:true
    }
  }
}());
