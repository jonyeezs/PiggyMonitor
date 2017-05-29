var findClosetTableId = require('../utils/element-helper').findClosetTableId;
module.exports = ediTr;

ediTr.$inject = ['$q', '_', '$timeout', 'ediTrMultiSelection'];
function ediTr($q, _, $timeout, ediTrMultiSelection) {
  var directive = {
    template: require('./edi-tr.html'),
    restrict: 'A',
    scope: {
      colSetup: '<ediTrSetup',
      editable: '<?ediTrEditable',
      saveCallback: '&?ediTrOnSave'
    },
    require: {
      form: '?form',
      model: 'ngModel'
    },
    link: linkTr
  };
  return directive;

  function linkTr(scope, ele, attr, api) {

    var disposeMultiSelectListener = null;
    var _previousModelValue = undefined;
    var ediTableId = findClosetTableId(ele);

    var displayActions = false;

    scope.showActions = function() {
      if (scope.editable) {
        // A trick to wait for DOM to render, then do our action
        $timeout(/*see LESSONS.md for more info*/)
        .then(function () {
          scope.displayActions = true;
        });
      }
    }

    //ngModel
    api.model.$render =  function viewToTdData() {
      var value = api.model.$viewValue || api.model.$modelValue;

      scope.model = Object.assign({}, value);

      //register in the render so that the model id can be obtained
      //register multi-selector only if the edi-table was given an id
      if(attr.ediTrMultiSelector && disposeMultiSelectListener == null && ediTableId) {
        disposeMultiSelectListener = ediTrMultiSelection.register({
          set model(changeObj) {
            var newModel = Object.assign({}, api.model.$modelValue || api.model.$viewValue, changeObj);
            api.model.$setViewValue(newModel);
          },
          get model() {
            return Object.assign({}, api.model.$modelValue);
          },
          set previousModel(model) {
            _previousModelValue = Object.assign({}, model);
          },
          get previousModel() {
            return Object.assign({}, _previousModelValue);
          }
        },
        rollBackNgModelAndResetEditState,
        function updateEdiTrState(newState) {
          Object.assign(scope._editState, newState);
        },
        scope.model.id, ediTableId);
      }
    };

    if (scope.editable)
    {
      if (_.isPlainObject(scope.editable)) {
        scope._editState = Object.assign(setResetEditState(), { inProgress: scope.editable.inProgress, forceEdit: scope.editable.forceEdit});
      }
      else {
        scope._editState = setResetEditState();
      }

      api.model.$viewChangeListeners.push(function updateModel() {
        scope.model = api.model.$modelValue;
      });
    }

    //callback to obtain changes in the tds
    scope.modelValueChange = function (changeObj) {
      //clones into a new object to overcome the strict equality on $render, with persisting any properties needed by angular
      var data = Object.assign({}, api.model.$modelValue || api.model.$viewValue, changeObj);
      if(ediTrMultiSelection.hasMultiSelected(ediTableId)) {
        ediTrMultiSelection.updateProperty(ediTableId, data.id, changeObj);
      }
      api.model.$setViewValue(data);
    }

    // Buttons
    if (api.form) {
      scope.edit = function (evt, selectedItem) {
        evt.stopPropagation();

        if (!scope.editable) return;

        _previousModelValue = api.model.$modelValue;

        if(ediTrMultiSelection.hasMultiSelected(ediTableId)) {
          ediTrMultiSelection.prepareForEdit(ediTableId, scope.model.id);
        }

        scope._editState.inProgress = true;
        scope._editState.saving = false;
      };

      scope.save = function (evt, selectedItem) {
        evt.stopPropagation();

        if (!scope.editable) return;

        if (api.form.$pristine || api.form.$invalid) return;

        updateToServer(api.model.$modelValue);
      };

      scope.cancel = function (evt) {
        evt.stopPropagation();

        if (!scope.editable) return;

        if(ediTrMultiSelection.hasMultiSelected(ediTableId)) {
          ediTrMultiSelection.rollbackAll(scope.model.id, ediTableId);
        }

        rollBackNgModelAndResetEditState();
      };
    }

    scope.$on('$destroy', function () {
      if (disposeMultiSelectListener != null) { disposeMultiSelectListener(); }
    });

    function updateToServer(value) {
      scope._editState.saving = true;

      //TODO this isn't working yet to set the loading state
      var items = ediTrMultiSelection.hasMultiSelected(ediTableId) ? ediTrMultiSelection.getSelectedItems(ediTableId, true) : [value];

      scope.saveCallback({ items: items })
        .then(function () {
          api.form.$setPristine();
          scope._editState.saving = false;
          ediTrMultiSelection.updateEditState(ediTableId, {saving: false, inProgress: scope._editState.forceEdit});
        }, function () {
          scope._editState.saving = false;
        });
    };

    function rollBackNgModelAndResetEditState() {
      api.model.$setViewValue(_previousModelValue);
      api.form.$setPristine();
      scope._editState = setResetEditState();
    }

    function setResetEditState() {
      return {
        inProgress: false,
        saving: false,
        forceEdit: false,
        multiSelected: false
      };
    }
  }
}
