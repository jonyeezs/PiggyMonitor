var widget = require('./widget.directive');

module.exports = angular
  .module('component.widget', [])
  .directive(widget.name, widget)
  .name;
