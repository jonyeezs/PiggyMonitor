module.exports = logger;

logger.$inject = ['$log'];
function logger($log) {
  var service = {
    error   : error,
    promise : errorForPromise, // logs as error then continue to reject. use this for promises
    info    : info,
    success : success,
    warning : warning,

    // straight to console; bypass toastr
    log     : $log.log
  };

  return service;
  /////////////////////

  function error(message, data, title) {
    $log.error('Error: ' + message, data);
  }

  function info(message, data, title) {
    $log.info('Info: ' + message, data);
  }

  function success(message, data, title) {
    $log.info('Success: ' + message, data);
  }

  function warning(message, data, title) {
    $log.warn('Warning: ' + message, data);
  }

  function errorForPromise(message, data, title) {
    if (data.data && data.data.description) {
      var thrownDescription = '\n' + data.data.description;
      message += thrownDescription;
    }
    error(message, data);
  }
}
