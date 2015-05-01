/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBCommandList', ceQuestionBCommandList);

  ceQuestionBCommandList.$inject = ['$state', 'movePieceService'];
  function ceQuestionBCommandList($state, movePieceService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionB/directives/ceQuestionBCommandListDirective/ceQuestionBCommandList.html',
      scope: {level: '@'},
      controllerAs: 'vm',
      controller: ['$scope',controller],
      bindToController: true
    };


    //////
    function controller($scope) {

      var vm = this;
      vm.commands = [];
      vm.addCommand = addCommand;
      vm.deleteLastCommand = deleteLastCommand;
      vm.runCommands = runCommands;
      vm.reload = reload;

      //////
      function addCommand() {
        var command = {from: '', to: ''};
        vm.commands.push(command);
      }

      function deleteLastCommand() {
        vm.commands.pop();
      }

      function reload() {
        $state.go($state.current, {}, {reload: true});
      }

      function runCommands() {

        console.log(vm.commands);
        var currentIdx = 0;

        //var markIdx = function (currIdx,cmdLength,cmdList) {
        //  R.cond([R.compose(R.not, R.eq(cmdLength)), cmdList[currIdx] = 'red']);
        //};
        //
        var initColor = function (cmdList) {
          return R.forEach(function(e){
            e.bgColor = '';
          })(cmdList);
        };

        var formatWithPrefix = function (raw) {
          return 'droppable' + raw;
        };

        //
        //var movePiece = function (cmdList, initColor, markIdx, from, to) {
        //  var init = R.once(initColor);
        //  cmdList = init(cmdList);
        //
        //
        //  R.cond(
        //    [R.eq(true), function () {
        //      markIdx(idx);
        //    },
        //      R.eq(false), function () {
        //    }
        //    ]);
        //};
        vm.commands = initColor(vm.commands);

        var result = vm.commands.every(function (el, idx) {
          var move = R.converge(
            movePieceService.movePiece,
            R.compose(formatWithPrefix, R.prop('from')),
            R.compose(formatWithPrefix, R.prop('to'))
          );
          //should be refactored
          currentIdx = idx;
          return move({from: el.from, to: el.to});
        });

        //if (result === false || currentIdx != vm.commands.length - 1) {
        if (result === false) {
          console.log('i am in');
          vm.commands[currentIdx].bgColor = 'red';
          console.log(currentIdx);
          console.log(vm.commands[currentIdx]);
        }

      }

    }
  }

}());
