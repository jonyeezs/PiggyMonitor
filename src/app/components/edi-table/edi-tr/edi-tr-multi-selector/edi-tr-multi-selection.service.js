module.exports =  ediTrMultiSelection;

ediTrMultiSelection.$inject = [];
function ediTrMultiSelection() {
  var registeredEdiTr = {};
  var _GENERIC_TABLE_NAME = '=GENERIC_TABLE_NAME='
  var multiSelectionEnabled = false;

  var service = {
    register: register,
    hasMultiSelected: hasMultiSelected,
    updateAllOtherSelectedForEdit: updateAllOtherSelectedForEdit,
    updateProperty: updateProperty,
    getSelectedItems: getSelectedItems,
    rollbackAll: rollbackAll,
    updateEditState: updateEditState,
    onSelectionPress: onSelectionPress,
    setAllItemSelection: setAllItemSelection,
    onTouchEnd: onTouchEnd
  };

  return service;


  /**
   * Updates the flag for the registered ediTr's edit states. Null is set to a parameter if there are no changes.
   * @callback stateCallback
   * @param {boolean} newInProgress
   * @param {boolean} newSaving
   * @param {boolean} newMultiSelected
   */
  /**
   * Register an edi-tr directive with a accessor to its model.
   * The register needs accessor to its current model (model) and previousModel before edit begins (previousModel)
   * @method register
   * @param  {Object}        accessor         - ES6 getter + setter model and previousModel. Model setters expects a hash of the item's property to be mutated
   * @param  {Function}      rollBackCallback - callback function to rollback a value
   * @param  {stateCallback} stateCallback    - callback function to set the edit state flags. func(inProgress, )
   * @param  {Number}        itemId           - unique identifier of the object
   * @param  {Number}        tableId          - id attribute of its edi-table
   * @return {Function}                         function to dispose the listener. MUST remember to dispose when the edi-tr component gets destroyed
   */
  function register(accessor, rollBackCallback, stateCallback, itemId, tableId) {
    tableId = tableId || _GENERIC_TABLE_NAME;

    if(!registeredEdiTr[tableId]) {
      registeredEdiTr[tableId] = [];
    }
    registeredEdiTr[tableId][itemId] = { selected: false, accessor: accessor, rollback: rollBackCallback, updateEditState: stateCallback };
    registeredEdiTr[tableId].inEdit = false;
    return function () {
      delete registeredEdiTr[tableId][itemId];

      registeredEdiTr[tableId].inEdit = false;

      if (registeredEdiTr[tableId].every(function(registeree) {return registeree == undefined})) { delete registeredEdiTr[tableId]; }
    };
  }

  function hasMultiSelected(tableId) {
    tableId = tableId || _GENERIC_TABLE_NAME;

    if (!registeredEdiTr[tableId]) return false;

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
   * returns a list of selected edi-tr's model
   * @method getSelectedItems
   * @param  {Number}       tableId     - id attribute of its edi-table
   * @param  {Boolean}      updateState - set to true to update all other selected item state for saving phase
   * @return {[Object]}                 - collection of selected items in the same edi-table
   */
  function getSelectedItems(tableId, isSaving) {

    return registeredEdiTr[tableId].
      filter(function(ediTr) {
        return ediTr.selected;
      }).
      map(function(ediTr) {
        if (isSaving) {
          ediTr.updateEditState({
            saving: true,
          });
        }
        return ediTr.accessor.model;
      });
  }

  /**
   * updates all selected edi-tr's previousModel, disables press events, and update the edit states
   * @method updateAllOtherSelectedForEdit
   * @param  {Number}       tableId - id attribute of its edi-table
   * @param  {Number}       itemId  - unique identifier of the main object
   */
  function updateAllOtherSelectedForEdit(tableId, itemId) {
    tableId = tableId || _GENERIC_TABLE_NAME;

    if (registeredEdiTr[tableId][itemId] == null) return;

    registeredEdiTr[tableId].inEdit = true;

    registeredEdiTr[tableId].forEach(function (ediTr, index) {
      if (index !== itemId && ediTr.selected)
      {
        var preCallValue = ediTr.accessor.model;
        ediTr.accessor.previousModel = preCallValue;
        ediTr.updateEditState({
          inProgress: true,
          multiSelected: true
        });
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

  function updateEditState(tableId, updatedState) {
    registeredEdiTr[tableId].forEach(function (ediTr) {
      ediTr.updateEditState(updatedState);
    });

    registeredEdiTr[tableId].inEdit = updatedState.inProgress;
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

    if (hasMultiSelected(tableId)) {
      var numberOfSelected = registeredEdiTr[tableId].filter(function (ediTr) { return ediTr.selected === true; }).length;
      registeredEdiTr[tableId][itemId].updateEditState({
        multiSelected: (numberOfSelected > 1) && registeredEdiTr[tableId][itemId].selected
      });
    }

    return registeredEdiTr[tableId][itemId].selected && hasMultiSelected(tableId);
  }

  function setAllItemSelection(tableId, isSelect) {
    tableId = tableId || _GENERIC_TABLE_NAME;
    registeredEdiTr[tableId].forEach((item) => {
      item.selected = isSelect;
    });
  }

  function onTouchEnd(itemId, $event) {
    // selectionAvailable = ctrl.items.some(function(item) {return item._multiSelected;});
  }
}
