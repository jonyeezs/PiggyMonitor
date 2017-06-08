module.exports = angular
  .module('infograph.bar-summary-compare', [
    require('angular-chart.js'),
    require('../../repositories/budget.service')
  ]).name;

require('./bar-summary-compare.component');
