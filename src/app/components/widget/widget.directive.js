 module.exports = widget;

function widget() {
  var directive = {
    scope: {
      'title': '@',
      'headingColour': '@',
      'subtitle': '@',
      'rightText': '@'
    },
    template: require('./widget.html'),
    restrict: 'E',
    transclude: true
  };
  return directive;
}
