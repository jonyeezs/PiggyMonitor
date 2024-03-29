module.exports = angular.module('backend-connector', [
  require('../common/logger')
])
  .factory('data', dataService)
  .name;

dataService.$inject = ['$http', 'config', 'logger', '$q'];
function dataService($http, config, logger, $q) {
  var url = config.dataUrl;

  var service = {
    get: get,
    patch: patch,
    post: post
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
      .catch(fail(url + '/' + resource));
  }

  /**
   * Patch with an array of values
   * @param  {string} resource       the api resource name
   * @param  {object|array} items    collection of article items of obj {description, category, occurance, amount}
   * @return {object} promise
   */
  function patch(resource, items) {
    return $http.patch(url + '/' + resource, items)
      .then(success)
      .catch(fail(url + '/' + resource));
  }

  function post(resource, item) {
    return $http.post(url + '/' + resource, item)
      .then(success)
      .catch(fail(url + '/' + resource));
  }

  function success(response) {
    return response.data.content;
  }

  function fail(message) {
    return function(error) {
      logger.promise('fail for: ' + message, error);
      return $q.reject(error);
    };
  }
}
