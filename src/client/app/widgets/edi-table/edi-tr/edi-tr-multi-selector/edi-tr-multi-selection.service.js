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
      prepareForEdit: prepareForEdit,
      updateProperty: updateProperty,
      rollbackAll: rollbackAll,
      completeForEdit: completeForEdit,
      onSelectionPress: onSelectionPress,
      onTouchEnd: onTouchEnd
    };

    return service;

    /**
     * register an edi-tr directive with a accessor to its model.
     * The register needs accessor to its current model (model) and previousModel before edit begins (previousModel)
     * @method register
     * @param  {Object}   accessor        - ES6 getter + setter model and previousModel. Model setters expects a hash of the item's property to be mutated
     * @param  {Function} rollBackCaller  - callback function to rollback a value
     * @param  {Number}   itemId          - unique identifier of the object
     * @param  {Number}   tableId         - id attribute of its edi-table
     * @return {Function}                   function to dispose the listener. MUST remember to dispose when the edi-tr component gets destroyed
     */
    function register(accessor, rollBackCaller, itemId, tableId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      if(!registeredEdiTr[tableId]) {
        registeredEdiTr[tableId] = [];
      }
      registeredEdiTr[tableId][itemId] = { selected: false, accessor: accessor, rollback: rollBackCaller };
      registeredEdiTr[tableId].inEdit = false;
      return function () {
        delete registeredEdiTr[tableId][itemId];

        registeredEdiTr[tableId].inEdit = false;

        if (registeredEdiTr[tableId].every(function(registeree) {return registeree == undefined})) { delete registeredEdiTr[tableId]; }
      };
    }

    function hasMultiSelected(tableId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      return registeredEdiTr[tableId].some(function (ediTr) { return ediTr.selected === true; });
    }

    /**
     * update a single property for all selected items
     * @method updateProperty
     * @param  {Number}       tableId - id attribute of its edi-table
     * @param  {Number}       itemId  - unique identifier of the object
     * @param  {Object}       change  - a single item's property key-value pair that contains the changes
     */
    function updateProperty(tableId, itemId, change) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      if (registeredEdiTr[tableId][itemId] == null) return;
      registeredEdiTr[tableId].forEach(function (ediTr, index) {
        if (index !== itemId && ediTr.selected)
        {
          var oldValue = ediTr.accessor.model;
          ediTr.accessor.model = change;
        }
      });
    }

    /**
     * updates all selected edi-tr's previousModel and disables press events
     * @method prepareForEdit
     * @param  {Number}       tableId - id attribute of its edi-table
     * @param  {Number}       itemId  - unique identifier of the object
     */
    function prepareForEdit(tableId, itemId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      if (registeredEdiTr[tableId][itemId] == null) return;

      registeredEdiTr[tableId].inEdit = true;

      registeredEdiTr[tableId].forEach(function (ediTr, index) {
        if (index !== itemId && ediTr.selected)
        {
          var preCallValue = ediTr.accessor.model;
          ediTr.accessor.previousModel = preCallValue;
        }
      });
    }

    /**
     * Propagates the edi-tr's rollback method on all selected items
     * @method rollbackAll
     * @param  {Number}         itemId  - unique identifier of the OP (original poster)
     * @param  {Number}         tableId - id attribute of OP's edi-table
     */
    function rollbackAll(itemId, tableId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      registeredEdiTr[tableId].inEdit = false;

      registeredEdiTr[tableId].forEach(function (ediTr, index) {
        if (index !== itemId && ediTr.selected) { ediTr.rollback(); }
      });
    }

    function completeForEdit(tableId) {
      registeredEdiTr[tableId].forEach(function (ediTr) {
        ediTr.selected = false;
      });

      registeredEdiTr[tableId].inEdit = false;
    }

    /**
     * Side effect behaviour when a press action is perform that we need to update the multi selection view
     * @method onSelectionPress
     * @param  {Number}         itemId  - unique identifier of the OP (original poster)
     * @param  {Number}         tableId - id attribute of OP's edi-table
     * @return {Boolean}                - If the item was flagged for selected
     */
    function onSelectionPress(itemId, tableId) {
      tableId = tableId || _GENERIC_TABLE_NAME;

      //disable event when in edit mode
      if (registeredEdiTr[tableId] && registeredEdiTr[tableId].inEdit) { return registeredEdiTr[tableId][itemId].selected; }

      registeredEdiTr[tableId][itemId].selected = !registeredEdiTr[tableId][itemId].selected;

      return registeredEdiTr[tableId][itemId].selected && hasMultiSelected(tableId);
    }

    function onTouchEnd(itemId, $event) {
      // selectionAvailable = ctrl.items.some(function(item) {return item._multiSelected;});
    }
  }
})();
