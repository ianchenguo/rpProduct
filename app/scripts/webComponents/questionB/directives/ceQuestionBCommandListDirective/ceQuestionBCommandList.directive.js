/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBCommandList', ceQuestionBCommandList);

  ceQuestionBCommandList.$inject =
    [
      '$ionicScrollDelegate',
      '$mdDialog',
      '$q',
      '$state',
      'movePieceService',
      'questionBService',
      'readableLogService'
    ];
  function ceQuestionBCommandList($ionicScrollDelegate,
                                  $mdDialog,
                                  $q,
                                  $state,
                                  movePieceService,
                                  questionBService,
                                  readableLogService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionB/directives/ceQuestionBCommandListDirective/ceQuestionBCommandList.html',
      scope: {level: '@'},
      controllerAs: 'vm',
      controller: ['$scope', controller],
      bindToController: true
    };


    //////
    function controller($scope) {

      var vm = this;

      vm.commands = function () {
        if (questionBService.retrievePreviousLevel() != vm.level || vm.level == 0 || vm.level > 3) {
          questionBService.storeCurrentLevel(vm.level);
          return [{from: '', to: '', pressed: false, bgColor: ''}];
        }

        else {
          questionBService.storeCurrentLevel(vm.level);
          return questionBService.retrievePreviousCommands();
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

        $ionicScrollDelegate.$getByHandle('commandListScroll').scrollBottom();
        return commands;
      };

      var revertCommandList = function revertCommandList(commands) {

        if (R.last(commands).pressed) {

          var lastStep = R.last(questionBService.getCommandHistory());
          return movePieceService.movePiece(lastStep.from, lastStep.to, lastStep.target)
            .then(function () {
              questionBService.removeFromCommandHistory();
              return updateCommandList(R.init(commands));
            })
        }
        else {
          return updateCommandList(R.init(commands));
        }
      };

      var reloadState = function reloadState() {
        $state.go($state.current, {}, {reload: true});
      };

      var storeCurrentCommandList = function storeCurrentCommandList(commands) {
        questionBService.storeCurrentCommands(commands);
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
        questionBService.moveBackToInitState();

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
                return movePieceService
                  .movePiece(formattedFrom, formattedTo, idx)
                  .then(function () {
                    el.pressed = true;
                    questionBService.addToCommandHistory({from: formattedTo, to: formattedFrom, target: vm.idx});
                  });
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

      var deleteLastCommand = R.composeP(
        logCommandRemove,
        R.tap(function () {
          vm.lock = false;
        }),
        revertCommandList,
        R.tap(function () {
          vm.lock = true;
        }));

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

      var log = function log(x) {
        console.log(x);
        return x;
      };


      vm.addCommand = addCommand;
      vm.deleteLastCommand = deleteLastCommand;
      vm.runCommands = executeCommands;
      vm.reload = reloadStage;

      vm.canAdd = R.compose(
        R.not,
        R.prop('pressed'),
        R.defaultTo({pressed: true}),
        R.last);

      vm.disableDelete = R.isEmpty;
      vm.lock = false;

      (function init() {
        questionBService.clearCommandHistory();
      }());
    }
  }

}());
