var routerHelperProvider = require('./router-helper.provider');
module.exports = angular.module('common.router', [
  require('@uirouter/angularjs').default,
  require('../logger')
])
.provider(routerHelperProvider.name, routerHelperProvider)
.name;
