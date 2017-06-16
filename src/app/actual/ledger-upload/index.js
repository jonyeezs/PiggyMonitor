require('angular-ui-switch');
require('angular-ui-switch/angular-ui-switch.min.css');

var ledgerUpload = require('./ledger-upload.service');
var csv = require('./csv.service');

module.exports = angular.module('actual.ledger-upload', [
  require('angular-ui-bootstrap/src/progressbar'),
  require('angular-ui-bootstrap/src/modal'),
  require('ng-file-upload'),
  require('../../repositories/actual.service'),
  require('../../repositories/budget.service'),
  'uiSwitch'
])
.factory(ledgerUpload.name, ledgerUpload)
.factory(csv.name, csv)
.name;

require('./item-creation-modal.component');
require('./ledger-upload.component');
