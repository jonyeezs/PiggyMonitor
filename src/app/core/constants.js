module.exports = angular
  .module('app')
  .constant('_', require('lodash'))
  .constant('moment', require('moment'))
  .constant('occurances', ['daily', 'weekly', 'fortnightly', 'monthly', 'quarterly', 'semiannual', 'annually']);
