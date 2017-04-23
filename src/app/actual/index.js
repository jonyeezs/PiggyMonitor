var ActualController = require('./actual.controller');

module.exports = angular.module('app.actual', [
  require('../components/drop-options'),
  require('../components/widget'),
  require('../components/edi-table'),
  require('../infographs/bar-cash-flow'),
  require('../infographs/bar-summary-comparer'),
  require('../common/router'),
  require('../common/logger'),
  require('../repositories/actual.service'),
  require('./ledger-upload')
])
.controller(ActualController.name, ActualController)
.run(require('./actual.route'))
.name;
