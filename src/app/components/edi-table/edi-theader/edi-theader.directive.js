module.exports = ediTheader;
function ediTheader() {
  var sortToggleWatchers = {};

  return {
    template: require('./edi-theader.html'),
    restrict: 'A',
    scope: {
      colDetail: '<',
      onSort: '&'
    },
    link: {
      pre: function (scope, _ele, attr) {
          // The collection in the ngRepeat is given a hashKey to identify it for the $watch listener
          // We'll be leveraging this as the unique identifier for a set of related th directives.
          var key = attr.$$element.context.parentNode.$$hashKey;

          //automatically register
          if (sortToggleWatchers[key] === undefined) {
            //Using array to store the registered headers. Better performance: http://jsben.ch/#/MBF21
            sortToggleWatchers[key] = [];
          }
          scope._registerKey = sortToggleWatchers[key].length;
          scope._registerKey = sortToggleWatchers[key].push(
            {
              id: scope._registerKey,
              update: function(header) {
                scope.showToggle = header === scope.colDetail.prop;
              }
            });
          //registration completed

          scope._updateSortToggles = function(header) {
            sortToggleWatchers[key].forEach(function (watcher) {
              watcher.update(header);
            })
          };

          scope._unregisterSortToggleWatcher = function () {
            var index = sortToggleWatchers[key].find(function(element) {return element.id === scope._registerKey;});
            sortToggleWatchers[key].splice(index, 1);
            if (!sortToggleWatchers[key].length)
            {
              delete sortToggleWatchers[key];
            }
          };
        },
      post: function (scope) {
        scope.toggleSort = function (event) {
          event.stopPropagation();
          scope.sortDesc = !scope.sortDesc;
          scope._updateSortToggles(scope.colDetail.prop);
          scope.onSort({ column: scope.colDetail.prop, desc: scope.sortDesc });
        }

        scope.$on('$destroy', function () {
          scope._unregisterSortToggleWatcher();
        });
      }
    }
  };
};
