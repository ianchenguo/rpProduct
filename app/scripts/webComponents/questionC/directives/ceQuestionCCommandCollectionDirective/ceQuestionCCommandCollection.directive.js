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
    '$ionicPopup',
    '$q',
    'movePieceService',
    'questionCService',
    'logQuestionExecutionService'];
  function ceQuestionCCommandCollection($timeout,
                                        $ionicScrollDelegate,
                                        $mdDialog,
                                        $ionicPopup,
                                        $q,
                                        movePieceService,
                                        questionCService,
                                        logQuestionExecutionService) {
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
      var isRunning = false;

      var runCommand = function runCommand(cmd, idx) {

        if (vm.level < 4) logQuestionExecutionService.logCommandExecution(cmd.text);

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
            if (vm.level < 4) logQuestionExecutionService.logCommandExecutionFinished();
            vm.deleteLock = false;
          }, 100);

          return deferred.promise;
        }

        else if (cmd.type === 'm') {
          cmd.bgColor = 'green';
          return cmd.func(vm.i, idx)
            .then(function (value) {
              cmd.bgColor = '';
              cmd.pressed = true;
              questionCService.addToCommandHistory({from: value.to, to: value.from, idx: idx});
              if (vm.level < 4) logQuestionExecutionService.logCommandExecutionFinished();
              if (vm.level < 4) questionCService.enableAdd();
            })
            .catch(function (error) {

              if (!R.isNil(error) && !R.isNil(error.idx)) {
                vm.commands[error.idx].bgColor = 'red';
                logQuestionExecutionService.logCommandExecutionError({idx: error.idx, content: cmd.text});
              }

              return $q.reject(null);
            })
            .finally(function () {
              vm.deleteLock = false;

            });

        }
      };

      var revertCommandList = function revertCommandList(commands) {

        var update = R.compose(
          logQuestionExecutionService.logCommandRemove,
          updateCommandList,
          R.init
        );

        if (R.last(commands).pressed) {
          if (R.last(commands).type === 'i') {
            vm.i = iHistory.pop();
            return update(commands);
          }
          else if (R.last(commands).type === 'm') {
            var lastStep = R.last(questionCService.getCommandHistory());
            return movePieceService
              .movePiece(lastStep.from, lastStep.to, lastStep.target)
              .then(function () {
                questionCService.removeFromCommandHistory();
                return update(commands);

              })
          }
        }
        else {
          return R.compose(questionCService.enableAdd, update)(commands);
        }
      };


      var updateCommandList = function updateCommandList(commands) {
        vm.commands = R.clone(commands);

        $ionicScrollDelegate.$getByHandle('commandCollectionScroll').scrollBottom();
        return commands;
      };

      var deleteLastCommand = R.composeP(
        R.tap(function () {
          vm.deleteLock = false;
        }),
        revertCommandList,
        R.tap(function () {
          vm.deleteLock = true;
        })
      );


      $scope.$on('questionCCommandAdded', function (ev, param) {
        updateCommandList(R.append(param, vm.commands));
        logQuestionExecutionService.logCommandAdd(vm.commands.length, param.text);
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
        logQuestionExecutionService.logCommandsExecution(vm.commands.length);
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
                  });
              })
              .catch(function (error) {
                if (!R.isNil(error) && !R.isNil(error.idx)) {
                  cmd.bgColor = 'red';
                }
                return $q.reject(null);
              });
          }
        );

        promise.finally(function () {
          logQuestionExecutionService.logCommandsExecutionFinished(vm.commands.length);
          questionCService.enableAdd();
          isRunning = false;
        });
      };

      var executeCommands = function executeCommands(ev) {
        if (vm.level > 3) {
          showConfirm(ev);
        } else {
          if(!isRunning) {
            isRunning = true;
            runCommands();

          }
        }
      };

      //var showConfirm = function (ev) {
      //  // Appending dialog to document.body to cover sidenav in docs app
      //  var confirm = $mdDialog.confirm()
      //    .parent(angular.element(document.body))
      //    .title('Confirm to run the command list?')
      //    .content('The commands will be executed one by one')
      //    .ariaLabel('Command List Execution Confirmation')
      //    .ok('YES')
      //    .cancel('NO')
      //    .targetEvent(ev);
      //  $mdDialog.show(confirm).then(function () {
      //    //if(!isRunning) {
      //    //  isRunning = true;
      //    //  runCommands();
      //    //}
      //  }, function () {
      //  });
      //};


      function showConfirm() {
        $mdDialog.show({
          clickOutsideToClose: false,
          scope: $scope,
          preserveScope: true,
          template:
          '<md-dialog>' +
          '  <md-dialog-content>' +
          '<h3>Confirm to run the command list?</h3>' +
          '<p>The commands will be executed one by one</p>' +
          '   <div class="md-actions" data-tap-disabled="true">' +
          '     <md-button ng-click="closeDialog()" class="md-warn">' +
          '       NO' +
          '     </md-button>' +
          '     <md-button ng-click="run()" class="md-primary">' +
          '       YES' +
          '     </md-button>' +
          '   </div>' +
          '  </md-dialog-content>' +
          '</md-dialog>',
          controller: function DialogController($scope, $mdDialog) {
            $scope.closeDialog = function() {
              $mdDialog.cancel();
            };
            $scope.run = function(){

              $mdDialog.hide().then(function(){
                if(!isRunning) {
                  isRunning = true;
                  runCommands();
                }
              });
            }
          }
        });
      }

      var showConfirm = showConfirm;


      vm.commands = [];
      vm.runCommand = runCommand;
      vm.executeCommands = executeCommands;
      vm.deleteLastCommand = deleteLastCommand;
      vm.disableDelete = R.isEmpty;
      vm.i = 0;
      vm.deleteLock = false;

      var activate = function () {
        questionCService.emptyCommands();
        questionCService.clearCommandHistory();
      }();
    }
  }

}());
