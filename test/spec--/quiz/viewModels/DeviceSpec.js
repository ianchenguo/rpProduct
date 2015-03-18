/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Device
  describe('Device', function () {

    //prepares testing env
    var Device;
    beforeEach(module('app'));
    beforeEach(inject(function (_Device_) {
      Device = _Device_;
    }));

    //prepares mock data
    var mockDeviceData;
    beforeEach(function () {
      mockDeviceData = {uuid: 'D-U-M-M-Y-U-U-I-D', platform: 'iPad', version: '7.1'};
    });

    it('should have a rev', function(){
      expect(new Device(mockDeviceData)._rev).to.exist;
    });

    //tests properties
    it('should have an id', function () {
      expect(new Device(mockDeviceData)._id)
        .to.equal('device_ipad_7.1_d-u-m-m-y-u-u-i-d');
    });

    it('should have uuid', function () {
      expect(new Device(mockDeviceData).uuid).to.equal(mockDeviceData.uuid);
    });

    it('should have platform', function () {
      expect(new Device(mockDeviceData).platform).to.equal(mockDeviceData.platform);
    });

    it('should have version', function () {
      expect(new Device(mockDeviceData).version).to.equal(mockDeviceData.version);
    });

  });
}());
