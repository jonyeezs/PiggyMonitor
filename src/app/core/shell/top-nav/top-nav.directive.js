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
    template: require('./top-nav.html')
  };

  return directive;
}
