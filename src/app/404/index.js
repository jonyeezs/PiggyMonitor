module.exports = angular.module('app.notfound', [
    require('../common/router')
])
.run(require('./404.route'))
.name;
