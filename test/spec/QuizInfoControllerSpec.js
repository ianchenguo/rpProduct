/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  describe('QuizInfoController', function () {

    var $scope,$q, vm, quizService,stub;

    //initialise with AngularJS injections
    beforeEach(module('app'));

    beforeEach(
      inject(function (_$q_,$controller, $rootScope, _quizService_) {
        $q = _$q_;
        $scope = $rootScope.$new();
        quizService = _quizService_;
        vm = $controller('QuizInfoController', {$q:$q, $scope: $scope, quizService: quizService});
      })
    );

    //create a stub for the quizService.initQuiz()
    beforeEach(function(){
      stub = sinon.stub(quizService,'initQuiz');
    });

    describe('vm.submitInfo()',function(){

      it('should exists', function (){
        expect(vm.submitInfo).to.be.not.undefined;
      });

      it('should fulfill received promise', function(){
        //let the stub returns a resolved promise
        var q = $q.defer();
        q.resolve('succeeded');
        stub.onCall(0).returns(q.promise);

        expect(vm.submitInfo()).to.be.fulfilled;
      });
    });

    //dummy tests
    describe('vm.test', function () {
      it('should exists', function () {
        expect(vm.test).to.be.not.undefined;
      });
      it('should equal to test', function () {
        console.log(quizService);
        expect(vm.test).to.equal('test');
      })
    });


  });
}());
