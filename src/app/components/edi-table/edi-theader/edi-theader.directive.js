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
          // Every individual component will run this same compile code.
          // But each collection of ngRepeat needs to work uniquely and not affect
          // another set of theaders.
          // Set a key to the colDetail that should not be accessible
          // NOTE: if this don't work out. need to use the id of table or edi-table
          var scopeOfIndividualNgRepeatObject = scope.$parent;
          var theFirstSameParent = scopeOfIndividualNgRepeatObject.$parent;
          var key = theFirstSameParent.$id;
          //automatically register
          if (sortToggleWatchers[key] === undefined) {
            // Using array to store the registered headers.
            // Better performance when dealing with dynamic collections that can be removed anytime.
            // http://jsben.ch/#/MBF21
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
          scope._unregisterSortToggleWatcher || scope._unregisterSortToggleWatcher();
        });
      }
    }
  };
};
