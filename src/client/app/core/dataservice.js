(function () {
  'use strict';

  angular
      .module('app.core')
      .factory('dataService', dataService);

  dataService.$inject = ['$http', 'config', 'exception'];
  /* @ngInject */
  function dataService($http, config, exception) {

    var url = config.dataUrl;

    var service = {
      get: get
    };

    return service;

    /**
    * Send a GET HTTP call to the url in config.
    * Throws exception on failure
    * @param {string} resource - the api resource name
    * @param {object} query - see params on https://docs.angularjs.org/api/ng/service/$http#usage
    * @returns {object} Promise
    */
    function get(resource, query) {
      var getCommand = !query ? $http.get(url + '/' + resource) :
              $http.get(url + '/' + resource, {params: query});
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
