var TopNavController = require('./top-nav.controller');

module.exports = angular
  .module('top.nav')
  .controller(TopNavController.name, TopNavController)
  .directive('topNav', topNav)
  .name;
function topNav () {
  var directive = {
    bindToController: true,
    controller: 'topNavController',
    controllerAs: 'vm',
    restrict: 'EA',
    scope: {
      'navline': '='
    },
    templateUrl: 'app/layout/top-nav/top-nav.html'
  };

  return directive;
}
