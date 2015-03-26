/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .controller('QuestionAController', QuestionAController);

  QuestionAController.$inject = ['$stateParams'];
  function QuestionAController($stateParams) {
    var vm = this;
    vm.levelType = $stateParams.level;
    vm.direction = $stateParams.direction;
    //console.log('direction????? ' + vm.direction);
  }

}());
