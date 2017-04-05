(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('logger', logger);

  logger.$inject = ['$log', '$q', 'toastr'];
  function logger($log, $q, toastr) {
    var service = {
      error   : error,
      errorAndReject: errorAndReject, // logs as error then continue to reject. use this for promises
      info    : info,
      success : success,
      warning : warning,

      // straight to console; bypass toastr
      log     : $log.log
    };

    return service;
    /////////////////////

    function error(message, data, title) {
      toastr.error(message, title);
      $log.error('Error: ' + message, data);
    }

    function info(message, data, title) {
      toastr.info(message, title);
      $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
      toastr.success(message, title);
      $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
      toastr.warning(message, title);
      $log.warn('Warning: ' + message, data);
    }

    function errorAndReject(message, data, title) {
      error(message, data);
      return $q.reject(e);
    }
  }
