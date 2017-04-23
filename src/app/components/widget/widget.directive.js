 module.exports = widget;

function widget() {
  var directive = {
    scope: {
      'title': '@',
      'headingColour': '@',
      'subtitle': '@',
      'rightText': '@'
    },
    templateUrl: 'app/components/widget.html',
    restrict: 'E',
    transclude: true
  };
  return directive;
}
