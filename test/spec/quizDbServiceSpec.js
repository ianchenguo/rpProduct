/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  //tests quizDbService
  describe('quizDbService', function () {

    //prepares testing env
    var quizDbService, Quiz, Child, Observer, Device,
      Question, STATE, GENDER, QUESTION_TYPE, dbService;
    beforeEach(module('app'));
    beforeEach(inject(function (_quizDbService_, _Quiz_, _Child_, _Observer_,
                                _Device_, _Question_, _STATE_, _GENDER_, _QUESTION_TYPE_,
                                _dbService_) {
      quizDbService = _quizDbService_;
      Quiz = _Quiz_;
      Child = _Child_;
      Observer = _Observer_;
      Device = _Device_;
      Question = _Question_;
      STATE = _STATE_;
      GENDER = _GENDER_;
      QUESTION_TYPE = _QUESTION_TYPE_;
      dbService = _dbService_;
    }));

    //solves 'Unexpected request" error, not working properly
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET("quiz/questionA/questionA.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("quiz/info/quizInfo.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("sideMenu/sideMenu.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("welcome/welcome.html").respond("<div>mock template</div>");
    }));

    //prepares mock data
    var mockQuestions, mockChild, mockObserver, mockDevice, mockQuiz;
    beforeEach(function () {

      mockQuestions = [new Question({endTimeStamp: '', type: QUESTION_TYPE.a, state: STATE.created, levels: ''})];
      mockChild = new Child({firstName: 'Sam', lastName: 'Fisher', age: 8, gender: GENDER.male});
      mockObserver = new Observer({firstName: 'Sam', lastName: 'Fisher', email: 'sam.fisher@jmail.com'});
      mockDevice = new Device({uuid: 'D-U-M-M-Y-U-U-I-D', platform: 'iPad', version: '7.1'});
      mockQuiz = new Quiz({
        child: mockChild,
        observer: mockObserver,
        device: mockDevice,
        endTimeStamp: '',
        state: STATE.created,
        questions: mockQuestions
      })
    });


    //tests createQuiz()
    describe('createQuiz()', function () {

      var db;

      //beforeEach(inject(function(_pouchDB_) {
      //  pouchDB = _pouchDB_;
      //}));
      //
      //beforeEach(function(){
      //  db = pouchDB('cedb', {adapter: 'websql'});
      //});


      beforeEach(function () {
        var $injector = angular.injector(['ng', 'pouchdb']);
        var pouchDB = $injector.get('pouchDB');
        db = pouchDB('cedb', {adapter: 'websql'});
      });

      function shouldNotBeCalled(rejection) {
        self.fail(rejection);
      }

      function shouldBeOK(response) {
        expect(response.ok).toBe(true);

      }

      it('should wrap put', function (done) {
        db.put(mockQuiz)
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    describe('createQuiz2()', function () {

      function shouldNotBeCalled(rejection) {
        self.fail(rejection);
      }

      function shouldBeOK(response) {
        expect(response.ok).toBe(false);
      }

      it('should wrap put', function (done) {
        console.log('11111111111111111111111111111111111111');

        var $injector = angular.injector(['ngCordova', 'ui.router', 'pouchdb', 'ng', 'core.dbService', 'app.quiz','app.quiz.questions.common']);

        console.log('22222222222222222222222222222222222222');

        var quizService = $injector.get('quizService');
        console.log('ASDFHLKASJDFLKASJDLKFASDF');
        console.log(quizService);

        quizService.initQuiz({firstName: 'Sam', lastName: 'Fisher', age: 8, gender: GENDER.male},{firstName: 'Sam', lastName: 'Fisher', email: 'sam.fisher@jmail.com'})
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });


    ////tests getQuiz()
    //describe('getQuiz()', function () {
    //  it('should get a Quiz object from database via id', function () {
    //    var promise = quizDbService.getQuiz(mockQuiz._id);
    //    expect(promise).to.eventually.have.property('_id').that.equals(mockQuiz._id);
    //  });
    //});


  });
}());
