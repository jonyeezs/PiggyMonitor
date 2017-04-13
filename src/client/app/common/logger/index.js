var loggerService = require('./logger.service');

module.exports = angular.module('logger', [
  require('angular-toastr')
])
.factory(loggerService.name, loggerService)
.name;
