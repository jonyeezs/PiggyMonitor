require('angular-chart.js');

module.exports = angular
  .module('infograph.bar-summary-compare', [
    'chart.js',
    require('../../repositories/budget.service')
  ]).name;

require('./bar-summary-compare.component');
