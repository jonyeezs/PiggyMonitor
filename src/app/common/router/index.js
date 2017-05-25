var routerHelperProvider = require('./router-helper.provider');
require('angular-ui-router');

module.exports = angular.module('common.router', [
  'ui.router',
  require('../logger')
])
.provider(routerHelperProvider.name, routerHelperProvider)
.name;
