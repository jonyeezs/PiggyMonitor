require('angular-chart.js');

module.exports = angular
  .module('infograph.bar-cash-flow', [
    'chart.js'
  ]).name;

require('./bar-cash-flow.component');
