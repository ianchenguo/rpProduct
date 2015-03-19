///**
//* Created by guochen on 11/03/15.
//*/
//
//(function () {
//  'use strict';
//
//  //tests QuizInfoController
//  describe('QuizInfoController', function () {
//
//    var $scope, $cordovaDevice,vm, quizService;
//
//    //prepares testing env
//    beforeEach(module('app'));
//    beforeEach(
//      inject(function (_$cordovaDevice_,$controller, $rootScope, _quizService_) {
//        $scope = $rootScope.$new();
//        $cordovaDevice = _$cordovaDevice_;
//        quizService = _quizService_;
//        vm = $controller('QuizInfoController', {$scope: $scope, quizService: quizService});
//      })
//    );
//
//    //solves 'Unexpected request" error
//    beforeEach(inject(function($httpBackend) {
//      $httpBackend.expectGET("quiz/questionA/questionA.html").respond("<div>mock template</div>");
//      $httpBackend.expectGET("quiz/info/quizInfo.html").respond("<div>mock template</div>");
//      $httpBackend.expectGET("sideMenu/sideMenu.html").respond("<div>mock template</div>");
//      $httpBackend.expectGET("welcome/welcome.html").respond("<div>mock template</div>");
//    }));
//
//    var getUUIDStub,getPlatformStub,getVersionStub;
//    beforeEach(function () {
//      getUUIDStub = sinon.stub($cordovaDevice, 'getUUID', function () {
//        return 'D-U-M-M-Y-U-U-I-D';
//      });
//      getPlatformStub = sinon.stub($cordovaDevice, 'getPlatform', function () {
//        return 'iPad';
//      });
//      getVersionStub = sinon.stub($cordovaDevice, 'getVersion', function () {
//        return '7.1';
//      });
//    });
//
//    afterEach(function(){
//      getUUIDStub.restore();
//      getPlatformStub.restore();
//      getVersionStub.restore();
//    });
//
//
//
//    it('should have a child property', function(){
//      expect(vm.child).to.exist;
//    });
//
//    it('should have an observer property', function(){
//      expect(vm.observer).to.exist;
//    });
//
//    describe('submitInfo()',function(){
//      it('should create a Quiz object and save it to database', function(){
//        expect(vm.submitInfo()).to.eventually.be.fulfilled;
//      });
//    });
//
//
//  });
//}());
