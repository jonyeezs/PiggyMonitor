module.exports = angular
  .module('app.core')
  .config(config);

config.$inject = ['$provide'];
function config($provide) {
  $provide.decorator('$exceptionHandler', decorateExceptionHandler);
}

decorateExceptionHandler.$inject = ['$delegate', 'logger'];
function decorateExceptionHandler($delegate, logger) {
  return function extendExceptionHandler(exception, cause) {
      var errorData = {exception: exception, cause: cause};
      exception.message = exception.message;
      $delegate(exception, cause);
      /**
       * Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception;
       *
       * @example
       *     throw { message: 'error message we added' };
       */
      logger.error(exception.message, errorData);
    };
}
