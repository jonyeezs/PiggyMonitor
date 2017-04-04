(function () {
  'use strict';

  angular
      .module('app.core')
      .filter('removeNegativeSym', removeNegativeSymFilter);

  removeNegativeSymFilter.$inject = [];

  function removeNegativeSymFilter() {
    return function (input, disable) {
      return (input < 0 && !disable) ? (input * -1) : input;
    };
  }
})();
