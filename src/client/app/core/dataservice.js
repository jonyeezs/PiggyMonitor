(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'config', 'exception', 'logger'];
    /* @ngInject */
    function dataService($http, $q, config, exception, logger) {

        var url = config.dataUrl;

        var service = {
            get: get
        };

        return service;


        function get(resource, query) {

            var getCommand = !query ? $http.get(url + '/' + resource)
                                    : $http.get(url + '/' + resource, { params: query });
            return getCommand
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.content;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for ' + resource)(e);
            }
        }
    }
})();
