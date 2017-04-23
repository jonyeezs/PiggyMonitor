var repeatComplete = require('./repeat-complete.directive');

module.exports = angular
  .module('edi-table.plugins', [])
  .directive(repeatComplete.name, repeatComplete)
  .name;
