/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Child
  describe('Child', function () {

    //prepares testing env
    var Child, GENDER;
    beforeEach(module('app'));
    beforeEach(inject(function (_Child_, _GENDER_) {
      Child = _Child_;
      GENDER = _GENDER_;
    }));

    //prepares mock data
    var mockChildData;
    beforeEach(function () {
      mockChildData = {firstName: 'Sam', lastName: 'Fisher', age: 8, gender: GENDER.male};
    });

    //tests properties
    it('should have first name', function () {
      expect(new Child(mockChildData).firstName).toEqual(mockChildData.firstName);
    });

    it('should have last name', function () {
      expect(new Child(mockChildData).lastName).toEqual(mockChildData.lastName);
    });

    it('should have age', function () {
      expect(new Child(mockChildData).age).toEqual(mockChildData.age);
    });

    it('should have gender', function () {
      expect(new Child(mockChildData).gender).toEqual(mockChildData.gender);
    });

  });
}());
