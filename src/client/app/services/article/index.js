var articleFactory = require('./article-factory.service');

module.exports = angular.module('svc.article', [
  require('../category')
])
.factory(articleFactory.name, articleFactory)
.name;
