/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Touch
  describe('Touch', function () {

    //prepares testing env
    var Touch;
    beforeEach(module('app'));
    beforeEach(inject(function (_Touch_) {
      Touch = _Touch_;
    }));

    //prepares mock data
    var mockTouchData;
    beforeEach(function () {
      mockTouchData = {timeStamp: 'dummy-time-stamp', evType: 'touchstart', elId:'dummy-element', x: 0, y: 0, dx: 0, dy: 0, dt: 10};
    });


    //tests properties
    it('should have a time stamp', function () {
      expect(new Touch(mockTouchData).timeStamp).toBeDefined();
    });

    it('should have an event type', function () {
      expect(new Touch(mockTouchData).evType).toEqual(mockTouchData.evType);
    });

    it('should have an element id', function(){
      expect(new Touch(mockTouchData).elId).toEqual(mockTouchData.elId);
    });

    it('should have an x coordinate', function () {
      expect(new Touch(mockTouchData).x).toEqual(mockTouchData.x);
    });

    it('should have an y coordinate', function () {
      expect(new Touch(mockTouchData).y).toEqual(mockTouchData.y);
    });

    it('should have a dx', function () {
      expect(new Touch(mockTouchData).dx).toEqual(mockTouchData.dx);
    });

    it('should have a dy', function () {
      expect(new Touch(mockTouchData).dy).toEqual(mockTouchData.dy);
    });

    it('should have a dt', function () {
      expect(new Touch(mockTouchData).dt).toEqual(mockTouchData.dt);
    });

  });
}());
