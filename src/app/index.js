const angular = require('angular');

module.exports = angular.module('app', [
  require('angular-animate'),
  require('angular-sanitize'),
  require('./common/logger'),
  require('./common/router'),
  require('./dashboard'),
  require('./actual'),
  require('./budget')
]);

require('./core');
