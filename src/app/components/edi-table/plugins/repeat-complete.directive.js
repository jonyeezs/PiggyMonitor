// Taken from: https://www.bennadel.com/blog/2592-hooking-into-the-complete-event-of-an-ngrepeat-loop-in-angularjs.htm
module.exports = repeatComplete;

repeatComplete.$inject = [];
function repeatComplete() {

  // id to identify a collection of a ngRepeat
  var uuid = 0;

  var directive = {
    compile: compile, //Compile the DOM node before it is linked by the ng-repeat directive
    // Higher priority than ngRepeat. Compile this before the ngRepeat directive does its thing
    // so that we can put the unique attribute and not have any more listening directive
    priority: 1110,
    restrict: "A"
  };
  return directive;

  function compile(ele, attr) {
    // Add the unique ID so we know how to query for
    // DOM elements during the digests
    var id = ++uuid;
    ele.attr("repeat-complete-id", id);

    // remove it from the DOM node and keep the callback expression
    var completeCallBack = attr.repeatComplete;
    ele.removeAttr("repeat-complete");

    return function postLink(scope) {
      var unbindWatcherWhenCompleted = scope.$watch(
        function lastChildExpression() {
          // querySelectorAll should be supported by all modern browsers: http://caniuse.com/#search=querySelectorAll
          let ngRepeatChildren = document.querySelectorAll('[repeat-complete-id="' + id + '"]');
          let lastItem = angular.element(ngRepeatChildren[ngRepeatChildren.length - 1]);
          if (!lastItem.length) { return undefined; }
          return lastItem.scope().$last;
        },
        function lastChildLoadedAction(isLast) {
          if (isLast) {
            // The repeated element is last in the iterator, stop watching.
            unbindWatcherWhenCompleted();
            // Invoke the callback.
            scope.$eval(completeCallBack);
          }
        }
      );
    };
  };
}
