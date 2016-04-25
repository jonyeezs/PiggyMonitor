(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .factory('sidebarservice', sidebarservice);

    sidebarservice.$inject = ['_', '$rootScope', 'exception'];
    /* @ngInject */
    function sidebarservice(_, $rootScope, exception) {

        // property and value are case sensitive
        var views = {
                Budget: 'Budget'
        };

        var currentView = '';
        var optionList = [];

        var service = {
            setView: setView,
            update: update,
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

        function update(list, view) {
            if(view){
                setView(view);
            }
            optionList = list;
            $rootScope.$broadcast('sidebarOptionsUpdated');
        }

        function get(){
            var list = [];
            switch(currentView){
                case views.Budget:
                    list = _.map(optionList, mapIt);
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
