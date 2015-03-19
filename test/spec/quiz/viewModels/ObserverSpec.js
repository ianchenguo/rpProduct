/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Observer
  describe('Observer', function () {

    //prepares testing env
    var Observer;
    beforeEach(module('app'));
    beforeEach(inject(function (_Observer_) {
      Observer = _Observer_;
    }));

    //prepares mock data
    var mockObserverData;
    beforeEach(function () {
      mockObserverData = {firstName: 'Solid', lastName: 'Snake', email:'solid.snake@jmail.com'};
    });


    //tests properties
    it('should have first name', function () {
      expect(new Observer(mockObserverData).firstName).toEqual(mockObserverData.firstName);
    });

    it('should have last name', function () {
      expect(new Observer(mockObserverData).lastName).toEqual(mockObserverData.lastName);
    });

    it('should have email', function () {
      expect(new Observer(mockObserverData).email).toEqual(mockObserverData.email);
    });

  });
}());
