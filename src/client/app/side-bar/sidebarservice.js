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

        var currentView = '';
        var categoryOptions = [];

        var service = {
            setView: setView,
            publish: publish,     // Takes in single string value array.
            get: get,
            views: views
        };

        return service;

        function setView(view){
            if (_.has(views, view)){
                currentView = view;
            }
            else
            {
                return exception.catcher('View: ' + view + 'does not exist');
            }
        }

        function publish(list, view) {
            if(view){
                setView(view);
            }
            categoryOptions = categoryFactory.createLabels(list);
            $rootScope.$broadcast('sidebarUpdated');
        }

        function get(){
            var list = [];
            switch(currentView){
                case views.Budget:
                    list = _.map(categoryOptions, mapIt);
                    list.unshift({
                        name: 'all',
                        content: '<i class="fa fa-dashboard"></i>all'}
                    );
                    break;
                default:
                    list = [{name: 'unavailable', content: '<b>404</b>'}];
            }
            return list;
        }

        function mapIt(option){
            switch(currentView){
                case views.Budget:
                    return createBudgetOption(option);
            }
        }

        function createBudgetOption(optionName){
            return {
                name: optionName,
                content: '<i class="fa fa-dashboard"></i>' + optionName
            };
        }
    }
})();
