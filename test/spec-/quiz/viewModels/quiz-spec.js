/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Question
  describe('Question', function () {

    //prepares testing env
    var Quiz, Child, Observer, STATE, GENDER;
    beforeEach(module('app'));
    beforeEach(inject(function (_Quiz_, _Child_, _Observer_, _STATE_, _GENDER_) {

      Quiz = _Quiz_;
      Child = _Child_;
      Observer = _Observer_;
      GENDER = _GENDER_;
      STATE = _STATE_;
    }));

    //prepares mock data
    var mockChild, mockObserver, mockQuizData;
    beforeEach(function () {

      mockChild = new Child({
        firstName: 'Sam',
        lastName: 'Fisher',
        age: 8,
        gender: GENDER.male
      });

      mockObserver = new Observer({
        firstName: 'Sam',
        lastName: 'Fisher',
        email: 'sam.fisher@jmail.com'
      });

      mockQuizData = {
        child: mockChild,
        observer: mockObserver,
        endTimeStamp: '',
        state: STATE.created
      };
    });

    //tests properties
    it('should have an id', function () {
      expect(new Quiz(mockQuizData)._id).toBeDefined();
    });

    it('should have a rev', function () {
      expect(new Quiz(mockQuizData)._rev).toBeDefined();
    });

    it('should have a start time stamp', function () {
      expect(new Quiz(mockQuizData).startTimeStamp).toMatch(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an end time stamp', function () {
      expect(new Quiz(mockQuizData).endTimeStamp).toEqual(mockQuizData.endTimeStamp);
    });

    it('should have a state', function () {
      expect(new Quiz(mockQuizData).state).toEqual(mockQuizData.state);
    });
  });
}());
