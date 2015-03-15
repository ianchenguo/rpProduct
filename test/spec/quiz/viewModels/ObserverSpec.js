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
      mockObserverData = {firstName: 'Sam', lastName: 'Fisher', email:'sam.fisher@jmail.com'};
    });

    //tests properties
    it('should have an id', function () {
      expect(new Observer(mockObserverData)._id)
        .to.equal('observer_sam.fisher@jmail.com_sam_fisher');
    });

    it('should have a rev', function(){
      expect(new Observer(mockObserverData)._rev).to.exist;
    });

    it('should have first name', function () {
      expect(new Observer(mockObserverData).firstName).to.equal(mockObserverData.firstName);
    });

    it('should have last name', function () {
      expect(new Observer(mockObserverData).lastName).to.equal(mockObserverData.lastName);
    });

    it('should have email', function () {
      expect(new Observer(mockObserverData).email).to.equal(mockObserverData.email);
    });

  });
}());
