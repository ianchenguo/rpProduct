/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .directive('ceQuestionCCommandCollection', ceQuestionCCommandCollection);

  ceQuestionCCommandCollection.$inject = ['$mdDialog', '$q', '$state', 'movePieceService', 'questionCService', 'readableLogService'];
  function ceQuestionCCommandCollection($mdDialog, $q, $state, movePieceService, questionCService, readableLogService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCCommandCollectionDirective/ceQuestionCCommandCollection.html',
      scope: {level: '@'},
      controllerAs: 'vm',
      controller: ['$scope', controller],
      bindToController: true
    };


    //////
    function controller() {

      var vm = this;

      vm.commands = function () {
        if (questionCService.retrievePreviousLevel() != vm.level || vm.level == 0 || vm.level > 3) {
          questionCService.storeCurrentLevel(vm.level);
          return [{from: '', to: ''}];
        }

        else {
          questionCService.storeCurrentLevel(vm.level);
          return questionCService.retrievePreviousCommands();
        }
      }();

      var logCommandAdd = function logCommandAdd(commands) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandAdd', {commandCount: commands.length})
        );
      };

      var logCommandRemove = function logCommandRemove(commands) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandRemove', {commandCount: commands.length})
        );
      };

      var logCommandsExecution = function logCommandsExecution(commands) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsExecute', {commandCount: commands.length})
        );
      };

      var logCommandsExecutionFinished = function logCommandsExecutionFinished(commands) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsExecuteFinish', {commandCount: commands.length})
        );
      };

      var logCommandsExecutionError = function logCommandsExecutionError(from, to, idx) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandExecuteError', {from: from, to: to, idx: idx})
        );
      };

      var logCommandsReload = function logCommandsReload(commands) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsReload', {commandCount: commands.length})
        );
      };

      var updateCommandList = function updateCommandList(commands) {
        vm.commands = R.clone(commands);
        return commands;
      };

      var reloadState = function reloadState() {
        $state.go($state.current, {}, {reload: true});
      };

      var storeCurrentCommandList = function storeCurrentCommandList(commands) {
        questionCService.storeCurrentCommands(commands);
        return commands;
      };

      var addEmptyCommand = function addCommand(commands) {
        var emptyCmd = {from: '', to: ''};
        return R.append(emptyCmd, commands);
      };

      var initColor = function (cmdList) {
        return R.forEach(function (e) {
          e.bgColor = '';
        })(cmdList);
      };

      var formatWithPrefix = function (raw) {
        return 'droppable' + raw;
      };

      var runCommands = function runCommands() {
        logCommandsExecution(R.clone(vm.commands));

        initColor(vm.commands);

        var deferred = $q.defer();
        deferred.resolve(null);
        var promise = deferred.promise;

        vm.commands.forEach(
          function (el, idx) {
            var formattedFrom = formatWithPrefix(el.from);
            var formattedTo = formatWithPrefix(el.to);

            promise = promise
              .then(function () {
                return movePieceService.movePiece(formattedFrom, formattedTo, idx);
              })
              .catch(function (error) {
                if (!R.isNil(error) && !R.isNil(error.idx)) {
                  vm.commands[error.idx].bgColor = 'red';
                  logCommandsExecutionError(el.from, el.to, idx);
                }
                return $q.reject(null);
              });
          }
        );

        promise.finally(function () {
          logCommandsExecutionFinished(vm.commands);
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

      var addCommand = R.compose(logCommandAdd, updateCommandList, addEmptyCommand);
      var deleteLastCommand = R.compose(logCommandRemove, updateCommandList, R.init);
      var reloadStage =
        R.cond(
          [
            function () {
              return vm.level > 0 && vm.level < 4;
            },
            R.compose(
              reloadState,
              logCommandsReload,
              storeCurrentCommandList,
              initColor
            )
          ],
          [
            function () {
              return vm.level > 3;
            },
            R.compose(
              reloadState,
              logCommandsReload)
          ]);

      vm.addCommand = addCommand;
      vm.deleteLastCommand = deleteLastCommand;
      vm.runCommands = executeCommands;
      vm.reload = reloadStage;
    }
  }

}());
