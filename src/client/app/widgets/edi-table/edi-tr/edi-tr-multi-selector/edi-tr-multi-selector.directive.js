/*
 * This is quite a copypasta from https://github.com/puneethrai/angular-long-press
 * I Did not need all the features he provided.
 * His work is awesome. Please do use his if you find this not as touchy as you like it to be.
 */
(function () {
  'use strict';

  // Directive for the ngModel linked to the actual input
  angular.module('app.edi-table')
    .directive('ediTrMultiSelector', ediTrMultiSelector);

  ediTrMultiSelector.$inject = ['$parse', '$timeout', 'EdiTrMultiSelection'];

  function ediTrMultiSelector($parse, $timeout, EdiTrMultiSelection) {
    var directive = {
      restrict: 'A',
      //Not using isolated scope as we need to be in the same scope as edi-tr to get its scope.item
      link: function (scope, ele, attrs) {

        if (attrs.ediTr == null) {
          return;
        }

        var TIMER_DURATION = 500;
        var LEFT_CLICK = 1, TOUCH_START = 'touchstart';
        var timer;
        var eventsBound = false;
        var selected = false;
        var ediTableId = ele.closest('edi-table').attr('id') || ele.closest('table').attr('id');

        var disposeEdiTouchyWatcher = scope.$watch(attrs.ediTrMultiSelector, function (enabled) {
          if (enabled) {
            if (eventsBound) return;
            ele.on('touchstart', onEnter);
            ele.on('touchend', onExit);
            ele.on('mousedown', onEnter);
            ele.on('mouseup', onExit);
            ele.on('click', onClick);
            eventsBound = true;
          } else {
            if (!eventsBound) return;
            ele.off('touchstart touchend mousedown mouseup click');
            eventsBound = false;
          }
        });

        scope.$on('$destroy', function () {
          disposeEdiTouchyWatcher();
        });

        function onEnter(evt) {
          if ((evt.which !== LEFT_CLICK && evt.type !== TOUCH_START)) return;

          //Cancel existing timer
          $timeout.cancel(timer);
          //To handle click event properly
          scope.longPressSent = false;
          // We'll set a timeout for 600 ms for a long press
          timer = $timeout(function () {
            scope.longPressSent = true;

            // Long press is done when nothing has been selected, then do selection only
            if (!EdiTrMultiSelection.hasMultiSelected(ediTableId)) {
              scope.$apply(function () {
                updateSelection(scope, evt);
              });
            }
          }, TIMER_DURATION);
        }

        function onExit(evt) {
          // Prevent the onLongPress event from firing
          $timeout.cancel(timer);

          // A normal press with selections made prior, then fire off the selection
          if (!scope.longPressSent && !$(evt.target)
            .is('select,input,button,button > span,checkbox') &&
            EdiTrMultiSelection.hasMultiSelected(ediTableId)) {
            scope.$apply(function () {
                updateSelection(scope, evt);
            });
          }

          scope.$apply(function () {
            EdiTrMultiSelection.onTouchEnd(scope.item.id, evt);
          });
        }

        function onClick(evt) {
          evt.preventDefault();
          evt.stopPropagation();
          //If long press is handled then prevent click
          if (scope.longPressSent) {
            evt.stopImmediatePropagation();
          }
        }

        function updateSelection(scope, evt)
        {
            var isToBeSelected = EdiTrMultiSelection.onSelectionPress(scope.item.id, evt.target.closest('edi-table').id);
            if(isToBeSelected) {
              ele.addClass('selected-row');
            }
            else {
              ele.removeClass('selected-row');
            }
        }
      }
    };
    return directive;
  }
})();
