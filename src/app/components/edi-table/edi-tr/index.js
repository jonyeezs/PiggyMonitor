var ediTr = require('./edi-tr.directive');

module.exports = angular.module('edi-table.edi-tr', [
  require('./edi-tr-multi-selector'),
  require('./edi-td')
])
  .directive(ediTr.name, ediTr)
  .name;
