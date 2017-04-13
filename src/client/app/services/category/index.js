var categoryFactory = require('./category-factory.service');

module.exports = angular.module('svc.category', [
  require('lodash')
])
  .factory(categoryFactory.name, categoryFactory)
  .name;
