/**
 * Created by guochen on 23/03/15.
 */

(function () {
  'use strict';

  describe('logService', function () {

    var questionLevelService, logService, Touch, STATE;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.log', 'core.db', 'app.quiz']);
      logService = $injector.get('logService');
      questionLevelService = $injector.get('questionLevelService');
      STATE = $injector.get('STATE');
      Touch = $injector.get('Touch');
    });

    beforeEach(function() {
      spyOn(questionLevelService,'getLocalQuestionLevel').and.returnValue({_id:'dummy-question-value'});
    })

    describe('logTouch()', function () {

      var mockDragStart, mockDrag, mockDragEnd;
      beforeEach(function () {
        mockDragStart = new Touch({
          timeStamp: 'dummy-time-stamp',
          evType: 'dragstart',
          elId: 'dummy-element-id',
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          dt: 0
        });

        mockDrag = new Touch({
          timeStamp: 'dummy-time-stamp',
          evType: 'drag',
          elId: 'dummy-element-id',
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          dt: 0
        });

        mockDragEnd = new Touch({
          timeStamp: 'dummy-time-stamp',
          evType: 'dragend',
          elId: 'dummy-element-id',
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          dt: 0
        });
      });
      it('should create a new Directive and push current event into it,' +
      'if the current event is dragstart', function () {

        logService.logTouch(mockDragStart);
        expect(logService.getCurrentDirective().state).toEqual(STATE.created);
        expect(logService.getCurrentDirective().questionLevel).toEqual(questionLevelService.getLocalQuestionLevel()._id);
        expect(logService.getCurrentDirective().touches[0]).toEqual(mockDragStart);
      });

      it('should push current event into current directive, if the current event is drag', function () {

        logService.logTouch(mockDragStart);
        logService.logTouch(mockDrag);
        expect(logService.getCurrentDirective().touches[1]).toEqual(mockDrag);
      });

      it('should finish current directive and push the last event into it,' +
      ' if the current event is dragend', function () {

        logService.logTouch(mockDragStart);
        logService.logTouch(mockDrag);
        logService.logTouch(mockDragEnd);
        expect(logService.getCurrentDirective().touches[2]).toEqual(mockDragEnd);
        expect(logService.getCurrentDirective().state).toEqual(STATE.finished);
        expect(logService.getCurrentDirective().endTimeStamp).toBeDefined();
      });

      it('should create a directive document after it finishes current directive', function (done) {

        function shouldNotBeCalled(rejection) {
          console.log(rejection);
          self.fail(rejection);
        }

        function shouldBeOK(response) {
          //console.log(response);
          expect(response.ok).toBe(true);
        }

        logService.logTouch(mockDragStart);
        logService.logTouch(mockDrag);
        logService.logTouch(mockDragEnd)
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);

      })
    });


  });

}());
