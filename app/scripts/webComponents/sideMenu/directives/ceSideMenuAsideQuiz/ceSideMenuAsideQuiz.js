/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuAsideQuiz', ceSideMenuAsideQuiz);

  ceSideMenuAsideQuiz.$inject = [
    '$state',
    'questionLevelService',
    'questionService',
    'quizService',
    'audioRecordingService',
    '$mdToast'];
  function ceSideMenuAsideQuiz($state,
                               questionLevelService,
                               questionService,
                               quizService,
                               audioRecordingService,
                               $mdToast) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuAsideQuiz/ceSideMenuAsideQuiz.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    };

    function controller() {

      var vm = this;

      vm.questions = [
        {
          name: 'Level 1',
          stages: [
            {
              name: 'exploration stage',
              subStages: [],
              link: 'app.quiz.questionA.levels({level:0})'
            },
            {
              name: 'intermediate stage',
              subStages: [
                {
                  name: 'left shift',
                  link: 'app.quiz.questionA.levels({level:1})'
                }, {
                  name: 'right shift',
                  link: 'app.quiz.questionA.levels({level:2})'
                }, {
                  name: 'asymmetry swap',
                  link: 'app.quiz.questionA.levels({level:3})'
                }
              ],
              link: ''
            }
          ]
        },
        {
          name: 'Level 2',
          stages: [
            {
              name: 'exploration stage',
              subStages: [],
              link: 'app.quiz.questionB.levels({level:0})'
            },
            {
              name: 'intermediate stages',
              subStages: [
                {
                  name: 'left shift',
                  link: 'app.quiz.questionB.levels({level:1})'
                }, {
                  name: 'right shift',
                  link: 'app.quiz.questionB.levels({level:2})'
                }, {
                  name: 'asymmetry swap',
                  link: 'app.quiz.questionB.levels({level:3})'
                }
              ],
              link: ''
            },
            {
              name: 'advanced stages',
              subStages: [
                {
                  name: 'left shift',
                  link: 'app.quiz.questionB.levels({level:4})'
                }, {
                  name: 'right shift',
                  link: 'app.quiz.questionB.levels({level:5})'
                }, {
                  name: 'asymmetry swap',
                  link: 'app.quiz.questionB.levels({level:6})'
                }
              ],
              link: ''
            }
          ]
        },
        {
          name: 'Level 3',
          stages: [
            {
              name: 'exploration stage',
              subStages: [],
              link: 'app.quiz.questionC.levels({level:0})'
            },
            {
              name: 'intermediate stages',
              subStages: [
                {
                  name: 'left shift',
                  link: 'app.quiz.questionC.levels({level:1})'
                }, {
                  name: 'right shift',
                  link: 'app.quiz.questionC.levels({level:2})'
                }, {
                  name: 'asymmetry swap',
                  link: 'app.quiz.questionC.levels({level:3})'
                }
              ],
              link: ''
            },
            {
              name: 'advanced stages',
              subStages: [
                {
                  name: 'left shift',
                  link: 'app.quiz.questionC.levels({level:4})'
                }, {
                  name: 'right shift',
                  link: 'app.quiz.questionC.levels({level:5})'
                }, {
                  name: 'asymmetry swap',
                  link: 'app.quiz.questionC.levels({level:6})'
                }
              ],
              link: ''
            }
          ]
        }
      ];

      var toggleStage = function toggleStage(stage) {
        stage.isShown = !stage.isShown;
      };

      var conditionalToggle = function conditionalToggle(toggleFunc, stage) {

        return R.cond(
          [R.compose(R.not, R.eq('exploration stage'), R.prop('name')), toggleFunc]
        )(stage);
      };

      var curriedConditionalToggle = R.curry(conditionalToggle);

      var isStageShown = function isStateShown(stage) {
        return stage.isShown;
      };

      vm.endQuiz = endQuiz;
      vm.toggleStage = curriedConditionalToggle(toggleStage);
      vm.isStageShown = isStageShown;
      //vm.test = _showRecordEndingToast;
    }

    //////
    function endQuiz() {
      return questionLevelService
        .finishQuestionLevel()
        .then(function () {
          return questionService.finishQuestion();
        })
        .then(function () {
          return quizService.finishQuiz();
        })
        .then(function () {
          _stopRecording();
          $state.go('app.welcome');
        })
    }

    function _stopRecording() {
      if (audioRecordingService.isRecording()) {
        audioRecordingService.stopRecord().then(function () {
          _showRecordEndingToast();
        });
      }
    }

    function _showRecordEndingToast() {
      $mdToast.show(
        $mdToast.simple()
          .content('Audio recording finished!')
          .position('false true false true')
          .hideDelay(3000)
      );
    }
  }

}());
