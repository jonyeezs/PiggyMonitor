/* jshint -W117, -W030, -W101  */
// jscs:disable
describe('drop-options component', function () {
  var element, scope;
  var handlerResult;
  beforeEach(function () {
    bard.appModule('app.core');
    bard.appModule('app.widgets');
    bard.inject(this, '$rootScope', '$compile');

    scope = $rootScope.$new();
    var _element = angular.element('<drop-options options="availableOptions" info="selectionMsg" on-select="selectHandler(value)"></drop-options>');
    element = $compile(_element)(scope);
    scope.availableOptions = [{key: 'display1', value: 1}, {key: 'display2', value: 2}];
    scope.selectionMsg = 'see this';
    scope.selectHandler = function(value) { handlerResult = value;};
    scope.$apply();
  });

  describe('on initialize', function() {
    it('should show the selection info message', function() {
      var buttonDisplay = element.find('button');
      expect(buttonDisplay.text()).to.equal(scope.selectionMsg);
    });
    context('on button click', function() {
      beforeEach(function() {
        element.find('button').click();
      });
      it('should have display list of all options without selection info', function() {
        var list = element.find('li').not('.ng-hide');
        expect(list.length).to.equal(scope.availableOptions.length);
      })
    });
  });

  describe('on selecting an option', function() {
    beforeEach(function() {
      element.find('button').click();
      element.find('li').not('.ng-hide').find('a')[0].click();
    });

    it('should display the selection on the button', function() {
      var buttonDisplay = element.find('button');
      expect(buttonDisplay.text()).to.equal(scope.availableOptions[0].key);
    });

    it('should show the selection info with the list of options', function() {
      element.find('button').click();
      var list = element.find('li').not('.ng-hide');
      expect(list.length).to.equal(2 + scope.availableOptions.length);
    });
  });
});
