var ediTemizer = require('./edi-temizer.directive');

module.exports = angular.module('edi-table.edi-temizer', [])
 .directive(ediTemizer.name, ediTemizer)
 .name;

require('./edi-temizer-button.component');
