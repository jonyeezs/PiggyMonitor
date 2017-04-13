var routerHelperProvider = require('./router-helper.provider');

module.exports = angular.module('router', [
  require('angular-ui-router'),
  require('../logger')
])
.provider(routerHelperProvider.name, routerHelperProvider)
.name;
