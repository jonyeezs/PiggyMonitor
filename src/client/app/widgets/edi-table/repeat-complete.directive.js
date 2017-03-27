// Taken from: https://www.bennadel.com/blog/2592-hooking-into-the-complete-event-of-an-ngrepeat-loop-in-angularjs.htm
(function () {
  'use strict';

  angular
    .module('app.edi-table')
    .directive('repeatComplete', repeatComplete);

  repeatComplete.$inject = [];

  function repeatComplete() {

    // We start scoping from a parent above our ngRepeat.
    // If ever
    var uuid = 0;

    var directive = {
      compile: compile, //Compile the DOM node before it is linked by the ng-repeat directive
      priority: 1110, //Higher priority than ngRepeat. Compile this before the ngRepeat directive does its thing
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

      return function postLink(scope, ele) {
        var unbindWatcherWhenCompleted = scope.$watch(
          function watchNgRepeatLastChildElement() {
            // check to see if there are any ngRepeat items being
            // rendered. Since we want to know when the
            // list has completed, we only need the last
            // one we can find.
            var lastItem = ele.siblings("*[ repeat-complete-id = '" + id + "' ]:last");

            if (!lastItem.length) {
              return;
            }

            if (lastItem.scope().$last) {
              // The repeated element is last in the iterator, stop watching.
              unbindWatcherWhenCompleted();
              // Invoke the callback.
              scope.$eval(completeCallBack);
            }
          }
        );
      };
    }
  }
})();
