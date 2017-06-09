var categoryFactory = require('./category-factory.service');

module.exports = angular.module('svc.category', [
])
.factory(categoryFactory.name, categoryFactory)
.name;
