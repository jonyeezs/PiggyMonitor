(function () {
    'use strict';

    angular
        .module('blocks.article')
        .directive('articleTable', articleTable);

    function articleTable() {
        var directive = {
            templateUrl: 'app/blocks/articletable/articletable.html',
            restrict: 'EA',
            scope: {
                items: '='
            },
            link: function (scope) {
                scope.sortType = '';
                scope.sortReverse = false;
            }
        };
        return directive;
    }
})();
