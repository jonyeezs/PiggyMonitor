/*
 * This is quite a copypasta from https://github.com/puneethrai/angular-long-press
 * I Did not need all the features he provided.
 * His work is awesome. Please do use his if you find this not as touchy as you like it to be.
 */
(function () {
  'use strict';

  // Directive for the ngModel linked to the actual input
  angular.module('app.edi-table')
    .directive('ediTrMultiSelector',ediTrMultiSelector);

  ediTrMultiSelector.$inject = ['$parse', '$timeout'];

  function ediTrMultiSelector($parse, $timeout) {
    var directive = {
      restrict: 'A',
      link: function (scope, ele, attrs) {

        if (!attrs.ediTrMultiSelector) {
          return;
        }
        var timerDuration = 500;
        var timer;
        var eventsBound = false;

        var disposeEdiTouchyWatcher = scope.$watch(attrs.ediTrMultiSelector, function (enabled) {
          if (enabled) {
            if (eventsBound) return;
            ele.on('touchstart', onEnter);
            ele.on('touchend', onExit);
            ele.on('mousedown', onEnter);
            ele.on('mouseup', onExit);
            ele.on('click', onClick);
            eventsBound = true;
          }
          else {
            if (!eventsBound) return;
            ele.off('touchstart touchend mousedown mouseup click');
            eventsBound = false;
          }
        });

        scope.$on('$destroy', function() {
          disposeEdiTouchyWatcher();
        });

        function onEnter(evt) {
          var functionHandler = $parse(attrs.onLongPress);

          //Cancel existing timer
          $timeout.cancel(timer);
          //To handle click event properly
          scope.longPressSent = false;
          // We'll set a timeout for 600 ms for a long press
          timer = $timeout(function () {
            scope.longPressSent = true;
            // If the touchend event hasn't fired,
            // apply the function given in on the element's on-long-press attribute
            scope.$apply(function () {
              functionHandler(scope, {
                $event: evt
              });
            });
          }, timerDuration);
        }

        function onExit(evt) {
          var onTouchEndFuncHandler = $parse(attrs.onTouchEnd);
          var onShortPressFuncHandler = $parse(attrs.onShortPress);
          // Prevent the onLongPress event from firing
          $timeout.cancel(timer);

          if (attrs.onShortPress && !scope.longPressSent && !$(evt.target).is('select,input,button,button > span,checkbox')) {
            scope.$apply(function () {
              onShortPressFuncHandler(scope, {
                $event: evt
              });
            });
          }

          if (attrs.onTouchEnd) {
            scope.$apply(function () {
              onTouchEndFuncHandler(scope, {
                $event: evt
              });
            });
          }
        }

        function onClick(evt) {
          evt.preventDefault();
          evt.stopPropagation();
          //If long press is handled then prevent click
          if (scope.longPressSent) {
            evt.stopImmediatePropagation();
          }
        }
      }
    };
    return directive;
  }
})();
