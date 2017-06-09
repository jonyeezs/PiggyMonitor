var DashboardController = require('./dashboard.controller');

module.exports = angular.module('app.dashboard', [
  require('../components/widget')
])
.controller(DashboardController.name,  DashboardController)
.run(require('./dashboard.route'))
.name;
