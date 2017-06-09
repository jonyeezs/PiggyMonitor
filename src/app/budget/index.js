var BudgetController = require('./budget.controller');
var budgetHelper = require('./budget-helper.service');

module.exports = angular.module('app.budget', [
  require('../services/article'),
  require('angular-ui-bootstrap/src/accordion'),
  require('../components/drop-options'),
  require('../components/edi-table'),
  require('../common/router'),
  require('../common/logger'),
  require('../repositories/budget.service')
])
.factory(budgetHelper.name, budgetHelper)
.controller(BudgetController.name, BudgetController)
.run(require('./budget.route'))
.name;
