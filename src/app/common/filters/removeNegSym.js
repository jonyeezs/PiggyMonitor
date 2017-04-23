module.exports = angular.module('filter.removeNegativeSym', [])
  .filter('removeNegativeSym', removeNegativeSymFilter)
  .name;

removeNegativeSymFilter.$inject = [];
function removeNegativeSymFilter() {
  return function (input) {
    return input < 0 ? (input * -1) : input;
  };
}
