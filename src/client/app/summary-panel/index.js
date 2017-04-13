var SummaryPanelController = require('./summary-panel.controller');
var summaryPanel = require('./summary-panel.directive');

module.exports = angular.module('app.summary', ['app.core', require('chart.js')])
  .controller(SummaryPanelController.name, SummaryPanelController)
  .directive(summaryPanel.name, summaryPanel)
  .name;
