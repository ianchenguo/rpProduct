/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Device', Device);

  function Device() {

    var Device = function Device(init) {
      this._id = 'device_' + init.platform.toLowerCase() + '_' + init.version + '_' + init.uuid.toLowerCase();
      this._rev = '';
      this.uuid = init.uuid;
      this.platform = init.platform;
      this.version = init.version;
    };

    return Device;
  }

}());
