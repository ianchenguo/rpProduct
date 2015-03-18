/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  //tests quizService
  describe('quizService', function () {

    //prepares testing env
    var $cordovaDevice, quizService, Quiz, GENDER;
    beforeEach(module('app'));
    beforeEach(inject(function (_$cordovaDevice_, _quizService_, _Quiz_, _GENDER_) {
      $cordovaDevice = _$cordovaDevice_;
      quizService = _quizService_;
      Quiz = _Quiz_;
      GENDER = _GENDER_;
    }));

    //solves 'Unexpected request" error
    beforeEach(inject(function($httpBackend) {
      $httpBackend.expectGET("quiz/questionA/questionA.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("quiz/info/quizInfo.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("sideMenu/sideMenu.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("welcome/welcome.html").respond("<div>mock template</div>");
    }));

    var getUUIDStub,getPlatformStub,getVersionStub;
    beforeEach(function () {
      getUUIDStub = sinon.stub($cordovaDevice, 'getUUID', function () {
        return 'D-U-M-M-Y-U-U-I-D';
      });
      getPlatformStub = sinon.stub($cordovaDevice, 'getPlatform', function () {
        return 'iPad';
      });
      getVersionStub = sinon.stub($cordovaDevice, 'getVersion', function () {
        return '7.1';
      });
    });

    afterEach(function(){
      getUUIDStub.restore();
      getPlatformStub.restore();
      getVersionStub.restore();
    });


    //prepares mock data
    var mockChildData, mockObserverData;
    beforeEach(function () {
      mockChildData = {firstName: 'Sam', lastName: 'Fisher', age: 8, gender: GENDER.male};
      mockObserverData = {firstName: 'Sam', lastName: 'Fisher', email: 'sam.fisher@jmail.com'};

    });

    //tests getLocalQuiz() may be only for test purpose
    describe('getLocalQuiz()', function () {
      it('should get the local Quiz object', function () {
        expect(quizService.getLocalQuiz()).to.be.instanceof(Quiz);
      });
    });

    //tests initQuiz()
    describe('initQuiz()', function () {

      it('should initialise local Quiz object with passed in data', function () {
        quizService.initQuiz(mockChildData, mockObserverData);
        expect(quizService.getLocalQuiz()).to.have.deep.property('child.firstName').that.equals(mockChildData.firstName);
      });

      it('should ceate a quiz document in database', function () {
        var promise = quizService.initQuiz(mockChildData, mockObserverData);
        expect(promise).to.eventually.have.property('ok').that.equals(true);
      });
    });

    //tests getQuiz()
    describe('getQuiz()', function () {

      it('should get quiz document by id and sync local Quiz object with it', function () {
        var promise = quizService.initQuiz(mockChildData, mockObserverData);
        promise.then(function(){
          var local = quizService.getLocalQuiz();

          expect(quizService.getQuiz(local._id)).to.eventually.have.property('_rev')
            .that.equals(quizService.getLocalQuiz()._rev);
        });

      });
    });

    ////tests addQuestion()
    //describe('addQuestion()', function () {
    //
    //  it('should add a Question ')
    //});


  });
}());
