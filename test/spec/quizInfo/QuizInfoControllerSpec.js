/**
* Created by guochen on 11/03/15.
*/

(function () {
  'use strict';

  //tests QuizInfoController
  describe('QuizInfoController', function () {

    var $templateCache, $state, $scope, vm, quizService;

    //prepares testing env
    beforeEach(module('app'));
    beforeEach(
      inject(function (_$templateCache_, _$state_, $controller, $rootScope) {
        $templateCache = _$templateCache_;
        $state = _$state_;
        $scope = $rootScope.$new();
        vm = $controller('QuizInfoController', {$scope: $scope, quizService: quizService});
      })
    );

    beforeEach(function(){
      $templateCache.put('scripts/webComponents/questionA/questionA.html','');
      $templateCache.put('scripts/webComponents/quizInfo/quizInfo.html','');
      $templateCache.put('scripts/webComponents/welcome/welcome.html','');
      $templateCache.put('scripts/webComponents/sideMenu/sideMenu.html','');
    });

    beforeEach(function () {
      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.db', 'app.quiz']);
      quizService = $injector.get('quizService');
    });

    it('should have a child property', function(){
      expect(vm.child).toBeDefined();
    });

    it('should have an observer property', function(){
      expect(vm.observer).toBeDefined();
    });

    describe('submitInfo()',function(){

      function shouldNotBeCalled(rejection) {
        console.log(rejection);
        self.fail(rejection);
      }

      function shouldBeOK(response) {
        $scope.$apply();
        expect(response.ok).toBe(true);
        expect($state.current.name).toBe('app.quiz.questionA.level0');
      }

      it('should create a quiz document in database and transit to the correct state', function(done){
        vm.submitInfo()
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });


  });
}());
