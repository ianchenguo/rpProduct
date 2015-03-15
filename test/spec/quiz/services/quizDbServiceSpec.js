/**
 * Created by guochen on 11/03/15.
 */

(function () {

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

    //prepares mock data
    var mockQuestions, mockChild, mockObserver, mockDevice, mockQuiz;
    beforeEach(function () {

      mockQuestions = [new Question({endTimeStamp: '', type: QUESTION_TYPE.a, state: STATE.created, levels: ''})];
      mockChild = new Child({firstName: 'Sam', lastName: 'Fisher', age: 8, gender: GENDER.male});
      mockObserver = new Observer({firstName: 'Sam', lastName: 'Fisher', email: 'sam.fisher@jmail.com'});
      mockDevice = new Device({uuid: 'D-U-M-M-Y-U-U-I-D', platform: 'iPad', version:'7.1'});
      mockQuiz = new Quiz({
        child: mockChild,
        observer: mockObserver,
        platform: mockDevice,
        endTimeStamp: '',
        state: STATE.created,
        questions: mockQuestions
      })
    });

    //tests createQuiz()
    describe('createQuiz()', function () {

      it('should save a Quiz object to database', function () {
        var promise = quizDbService.createQuiz(mockQuiz);
        expect(promise).to.eventually.have.property('ok').that.equals(true);
      })
    });

    //tests getQuiz()
    describe('getQuiz()', function () {
      it('should get a Quiz object from database via id', function () {
        var promise = quizDbService.getQuiz(mockQuiz._id);
        expect(promise).to.eventually.have.property('_id').that.equals(mockQuiz._id);
      });
    });


  });
}());
