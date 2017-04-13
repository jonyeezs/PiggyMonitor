var DashboardController = require('./dashboard.controller');

module.exports = angular.module('app.dashboard', [
  'app.widgets'
])
.controller(DashboardController.name,  DashboardController)
.run(require('./dashboard.route'))
.name;
