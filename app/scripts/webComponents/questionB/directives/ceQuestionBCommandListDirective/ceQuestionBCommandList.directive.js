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
      'movePieceService',
      'questionBService',
      'logQuestionExecutionService'
    ];
  function ceQuestionBCommandList($ionicScrollDelegate,
                                  $mdDialog,
                                  $q,
                                  movePieceService,
                                  questionBService,
                                  logQuestionExecutionService) {
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
      var isRunning = false;


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

        logQuestionExecutionService.logCommandsExecution(vm.commands.length);

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

                if(el.from && el.to){
                  return movePieceService
                    .movePiece(formattedFrom, formattedTo, idx)
                    .then(function () {
                      el.pressed = true;
                      questionBService.addToCommandHistory({from: formattedTo, to: formattedFrom, target: vm.idx});
                    });
                } else {
                  return $q.reject({idx:idx});
                }
              })
              .catch(function (error) {
                if (!R.isNil(error) && !R.isNil(error.idx)) {
                  vm.commands[error.idx].bgColor = 'red';
                  logQuestionExecutionService.logCommandExecutionError({idx:error.idx,from:el.from,to:el.to});
                }
                return $q.reject(null);
              });
          }
        );

        promise.finally(function () {
          logQuestionExecutionService.logCommandsExecutionFinished(vm.commands.length);
          isRunning = false;
        });

      };

      var executeCommands = function executeCommands() {
        if (vm.level > 3) {
          showConfirm();
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
      //    runCommands();
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

      var addCommand = R.compose(
        logQuestionExecutionService.logCommandAdd,
        R.prop('length'),
        updateCommandList,
        addEmptyCommand);

      var deleteLastCommand = R.composeP(
        logQuestionExecutionService.logCommandRemove,
        R.tap(function () {
          vm.lock = false;
        }),
        revertCommandList,
        R.tap(function () {
          vm.lock = true;
        }));

      vm.addCommand = addCommand;
      vm.deleteLastCommand = deleteLastCommand;
      vm.runCommands = executeCommands;

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
