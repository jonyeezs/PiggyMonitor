var ShellController = require('./shell.controller');

module.exports = angular.module('app',
  [require('./top-nav/top-nav.directive')])
.controller(ShellController.name, ShellController)
.name;
