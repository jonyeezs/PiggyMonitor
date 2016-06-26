(function () {
  'use strict';

  angular
      .module('app.core')
      .filter('removeNegativeSym', removeNegativeSymFilter);

  removeNegativeSymFilter.$inject = [];

  function removeNegativeSymFilter() {
    return function (input) {
      return input < 0 ? (input * -1) : input;
    };
  }
})();
