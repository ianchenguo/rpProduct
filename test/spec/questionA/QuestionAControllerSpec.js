/**
* Created by guochen on 11/03/15.
*/

(function () {
  'use strict';

  //tests QuestionAController
  describe('QuestionAController', function () {

    var $templateCache, $state, $scope, vm, quizService;

    //prepares testing env
    beforeEach(module('app'));
    beforeEach(
      inject(function (_$templateCache_, _$state_, $controller, $rootScope) {
        $templateCache = _$templateCache_;
        $state = _$state_;
        $scope = $rootScope.$new();
        vm = $controller('QuestionAController', {$scope: $scope, quizService: quizService});
      })
    );

    beforeEach(function(){
      $templateCache.put('scripts/webComponents/questionA/questionA.html','');
      $templateCache.put('scripts/webComponents/quizInfo/quizInfo.html','');
      $templateCache.put('scripts/webComponents/welcome/welcome.html','');
      $templateCache.put('scripts/webComponents/sideMenu/sideMenu.html','');
    });

    beforeEach(function () {
      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.dbService', 'app.quiz']);
      quizService = $injector.get('quizService');
    });

    beforeEach(function() {
      spyOn($state,'current.data.question').and.returnValue(QUESTION_LEVEL.a);
    });



    //describe('initialise()',function(){
    //
    //  function shouldNotBeCalled(rejection) {
    //    console.log(rejection);
    //    self.fail(rejection);
    //  }
    //
    //  function shouldBeOK(response) {
    //    expect(response.ok).toBe(true);
    //  }
    //
    //  it('should create a question document and a level document in database', function(done){
    //    vm.initialise()
    //      .then(shouldBeOK)
    //      .catch(shouldNotBeCalled)
    //      .finally(done);
    //  });
    //});


  });
}());
