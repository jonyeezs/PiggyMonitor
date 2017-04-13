var ledgerUpload = require('./ledger-upload.service');

module.exports = angular.module('actual.ledger-upload', [
  require('angular-ui-bootstrap/src/progressbar'),
  require('angular-ui-bootstrap/src/modal'),
  require('../../repositories/actual.service'),
  require('../../repositories/budget.service')
])
.constant('Csv', require('csv'))
.factory(ledgerUpload.name, ledgerUpload)
.name;

require('./item-creation-modal.component');
require('./ledger-upload.component');
