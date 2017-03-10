(function () {

  angular
    .module('app.edi-table')
    .factory('EdiTrMultiSelection', ediTrMultiSelection);

  ediTrMultiSelection.$inject = [];
  /* @ngInject */
  function ediTrMultiSelection() {
    var registeredEdiTr = {};
    var _GENERIC_TABLE_NAME = '=GENERIC_TABLE_NAME='
    var multiSelectionEnabled = false;

    var service = {
      register: register,
      hasMultiSelected: hasMultiSelected,
      updateValue: updateValue,
      onSelectionPress: onSelectionPress,
      onTouchEnd: onTouchEnd
    };

    return service;

    /**
     * register am edi-tr directive with a callback to update its model
     * @method register
     * @param  {Function} callback - callback to update its model
     * @param  {Number}   id       - unique identifier of the object
     * @param  {Number}   tableId  - id attribute of its edi-table
     * @return {Function}            function to dispose the listener
     */
    function register(callback, id, tableId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      if(!registeredEdiTr[tableId]) {
        registeredEdiTr[tableId] = [];
      }
      registeredEdiTr[tableId][id] = { selected: false, callback: callback };
      return function () {
        delete registeredEdiTr[tableId][id];
        if (registeredEdiTr[tableId].every(function(registree) {return registree == undefined})) registeredEdiTr[tableId] = [];
      };
    }

    function hasMultiSelected(tableId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      return registeredEdiTr[tableId].some(function (ediTr) { return ediTr.selected === true; });
    }

    function updateValue(id, mainDataIndex, value) {
      if (registeredEdiTr[id] == null) return;
      registeredEdiTr[id].forEach(function (ediTr, index) {
        if (index !== mainDataIndex) ediTr.callback(value);
      });
    }

    /**
     * Side effect behaviour when a press action is perform that we need to update the multi selection view
     * @method onSelectionPress
     * @param  {Number}         itemId  - unique identifier of the object
     * @param  {Object}         $event  - Jquery Event Object (http://api.jquery.com/category/events/event-object/)
     * @param  {Number}         tableId - id attribute of its edi-table
     * @return {Boolean}                - If the item was flagged for selected
     */
    function onSelectionPress(itemId, event, tableId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      registeredEdiTr[tableId][itemId].selected = !registeredEdiTr[tableId][itemId].selected;

      return registeredEdiTr[tableId][itemId].selected && hasMultiSelected(tableId);
    }

    function onTouchEnd(itemId, $event) {
      // selectionAvailable = ctrl.items.some(function(item) {return item._multiSelected;});
    }
  }
})();
