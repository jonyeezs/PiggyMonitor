var topNav = require('./top-nav/top-nav.directive');

module.exports = angular
  .module('app')
  .directive(topNav.name, topNav);

require('./shell.component');
