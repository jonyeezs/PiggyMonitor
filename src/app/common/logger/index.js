var loggerService = require('./logger.service');

module.exports = angular.module('common.logger', [])
.factory(loggerService.name, loggerService)
.name;
