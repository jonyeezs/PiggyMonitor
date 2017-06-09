var ediTrMultiSelection = require('./edi-tr-multi-selection.service');
var ediTrMultiSelector = require('./edi-tr-multi-selector.directive');

module.exports = angular.module('edi-tr.edi-tr-multi-selection', [])
  .factory(ediTrMultiSelection.name, ediTrMultiSelection)
  .directive(ediTrMultiSelector.name, ediTrMultiSelector)
  .name;
