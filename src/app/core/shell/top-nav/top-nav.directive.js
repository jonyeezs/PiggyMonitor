module.exports = topNav;

function topNav () {
  var directive = {
    bindToController: true,
    controller:  require('./top-nav.controller'),
    controllerAs: 'vm',
    restrict: 'EA',
    scope: {
      'navline': '='
    },
    templateUrl: 'app/layout/top-nav/top-nav.html'
  };

  return directive;
}
