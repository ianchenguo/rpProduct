/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .directive('ceQuestionCCommandCollection', ceQuestionCCommandCollection);

  ceQuestionCCommandCollection.$inject = ['$timeout',
    '$ionicScrollDelegate',
    '$mdDialog',
    '$q',
    '$state',
    'movePieceService',
    'questionCService',
    'readableLogService'];
  function ceQuestionCCommandCollection($timeout, $ionicScrollDelegate, $mdDialog, $q, $state, movePieceService, questionCService, readableLogService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCCommandCollectionDirective/ceQuestionCCommandCollection.html',
      scope: {level: '@'},
      controllerAs: 'vm',
      controller: ['$scope', controller],
      bindToController: true
    };


    //////
    function controller($scope) {
      var vm = this;
      var iHistory = [0];


      var logCommandAdd = function logCommandAdd() {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandAdd', {commandCount: vm.commands.length})
        );
      };

      var logCommandRemove = function logCommandRemove() {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandRemove', {commandCount: vm.commands.length})
        );
      };

      var logCommandsExecution = function logCommandsExecution() {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsExecute', {commandCount: vm.commands.length})
        );
      };

      var logCommandsExecutionFinished = function logCommandsExecutionFinished() {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsExecuteFinish', {commandCount: vm.commands.length})
        );
      };

      var logCommandsExecutionError = function logCommandsExecutionError(from, to, idx) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandExecuteError', {from: from, to: to, idx: idx})
        );
      };

      var logCommandsReload = function logCommandsReload() {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsReload', {commandCount: vm.commands.length})
        );
      };


      var runCommand = function runCommand(cmd, idx) {

        vm.deleteLock = true;

        var deferred = $q.defer();

        if (vm.level < 4) questionCService.disableAdd();

        if (cmd.type === 'i') {

          iHistory.push(vm.i);

          vm.i = cmd.func(vm.i);

          cmd.pressed = true;


          cmd.bgColor = 'green';
          $timeout(function () {
            deferred.resolve(null);
            cmd.bgColor = '';
            if (vm.level < 4) questionCService.enableAdd();

          }, 100);

          vm.deleteLock = false;

          return deferred.promise;
        }

        else if (cmd.type === 'm') {
          cmd.bgColor = 'green';
          return cmd.func(vm.i, idx)
            .then(function (value) {
              cmd.bgColor = '';
              cmd.pressed = true;
              console.log(value);
              questionCService.addToCommandHistory({from: value.to, to: value.from, idx: idx});
            })
            .catch(function () {
              cmd.bgColor = 'red';
              return $q.reject(null);
              //logCommandsExecutionError(vm.from, vm.to, 0);
            })
            .finally(function () {
              //logCommandsExecutionFinished();
              vm.deleteLock = false;
              if (vm.level < 4) questionCService.enableAdd();
            });
        }
      };

      var revertCommandList = function revertCommandList(commands) {

        if (R.last(commands).pressed) {
          if (R.last(commands).type === 'i') {
            vm.i = iHistory.pop();
            return updateCommandList(R.init(commands));
          }
          else if (R.last(commands).type === 'm') {
            var lastStep = R.last(questionCService.getCommandHistory());
            return movePieceService.movePiece(lastStep.from, lastStep.to, lastStep.target)
              .then(function () {
                questionCService.removeFromCommandHistory();
                return updateCommandList(R.init(commands));
              })
          }
        }
        else {
          return updateCommandList(R.init(commands));
        }
      };

      var updateCommandList = function updateCommandList(commands) {
        vm.commands = R.clone(commands);

        $ionicScrollDelegate.$getByHandle('commandCollectionScroll').scrollBottom();
        return commands;
      };

      var deleteLastCommand = R.composeP(
        //logCommandRemove,
        R.tap(function () {
          vm.deleteLock = false;
        }),
        revertCommandList,
        R.tap(function () {
          vm.deleteLock = true;
        }));


      $scope.$on('questionCCommandAdded', function (ev, param) {
        console.log(param);
        updateCommandList(R.append(param, vm.commands));
        if (vm.level < 4) questionCService.disableAdd();
      });


      var initColor = function (cmdList) {
        return R.forEach(function (e) {
          e.bgColor = '';
        })(cmdList);
      };

      var runCommands = function runCommands() {
        vm.i = 0;
        questionCService.moveBackToInitState();
        //logCommandsExecution(R.clone(vm.commands));
        questionCService.disableAdd();
        initColor(vm.commands);

        var deferred = $q.defer();
        deferred.resolve(null);
        var promise = deferred.promise;

        vm.commands.forEach(
          function (cmd, idx) {
            promise = promise
              .then(function () {
                return runCommand(cmd, idx)
                  .then(function () {
                    cmd.pressed = true;
                    cmd.bgColor = '';
                    //questionBService.addToCommandHistory({from: formattedTo, to: formattedFrom, target: vm.idx});
                  });
              })
              .catch(function (error) {
                if (!R.isNil(error) && !R.isNil(error.idx)) {
                  cmd.bgColor = 'red';
                  //logCommandsExecutionError(el.from, el.to, idx);
                }
                return $q.reject(null);
              });
          }
        );

        promise.finally(function () {
          logCommandsExecutionFinished(vm.commands);
          questionCService.enableAdd();
        });
      };

      var executeCommands = function executeCommands() {
        if (vm.level > 3) {
          showConfirm();
        } else {
          runCommands();
        }
      };

      var showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .parent(angular.element(document.body))
          .title('Confirm to run the command list?')
          .content('The commands will be executed one by one')
          .ariaLabel('Command List Execution Confirmation')
          .ok('YES')
          .cancel('NO')
          .targetEvent(ev);
        $mdDialog.show(confirm).then(function () {
          runCommands();
        }, function () {
        });
      };

      vm.commands = [];
      vm.runCommand = runCommand;
      vm.executeCommands = executeCommands;
      vm.deleteLastCommand = deleteLastCommand;
      vm.disableDelete = R.isEmpty;
      vm.i = 0;
      vm.deleteLock = false;

    }
  }

}());
