(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .factory('sidebarservice', sidebarservice);

    sidebarservice.$inject = ['_', '$rootScope', 'exception', 'categoryFactory'];
    /* @ngInject */
    function sidebarservice(_, $rootScope, exception, categoryFactory) {

        // property and value are case sensitive
        var views = {
                Budget: 'Budget'
        };

        var categoryOptions = [];

        var service = {
            renderOptions: renderOptions,
            views: views
        };

        return service;

        function renderOptions(items, viewType){
            var list = [];
            switch(viewType){
                case views.Budget:
                    categoryOptions = categoryFactory.createLabels(items);
                    list = _.map(categoryOptions, createBudgetOption);
                    list.unshift({
                        name: 'all',
                        icon: 'all all-side',
                        content: 'all'}
                    );
                    break;
                default:
                    list = [{name: 'unavailable', content: '<b>404</b>'}];
            }
            return list;
        }

        function createBudgetOption(optionName){
            return {
                name: optionName,
                icon: optionName+ ' ' + optionName + '-side',
                content: optionName
            };
        }
    }
})();
