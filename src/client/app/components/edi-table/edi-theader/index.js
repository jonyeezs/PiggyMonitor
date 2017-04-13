var ediTheader = require('./edi-theader.directive');

module.exports = angular.module('edi-table.edi-th', [])
 .directive(ediTheader.name, ediTheader)
 .name;
