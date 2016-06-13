(function () {
  'use strict';

  angular
      .module('app.core')
      .filter('removeNegativeSym', removeNegativeSymFIlter);

  removeNegativeSymFIlter.$inject = [];

  function removeNegativeSymFIlter() {
    return function (input) {
      return input < 0 ? (input * -1) : input;
    };
  }
})();
