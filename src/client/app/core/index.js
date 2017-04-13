module.exports = angular.module('app', [
  'ngAnimate', 'ngSanitize',
  require('../common/logger'),
  require('../common/router'),
  require('angular-toastr'),
  require('./shell')
])
.run(require('./core.route'))
.name;

require('./constants');
require('./config');
require('./exception-handler.provider');
