/* jshint -W117, -W030, -W101  */
require('../../../app/components/drop-options');

describe('drop-options component', function () {
  var _element, element, scope;
  var handlerResult;
  beforeEach(function (done) {
    bard.appModule('component.drop-options');
    bard.inject(this, '$rootScope', '$compile');

    scope = $rootScope.$new();
    _element = angular.element('<drop-options options="availableOptions" info="selectionMsg" on-select="selectHandler(value)"></drop-options>');
    scope.availableOptions = [{key: 'display1', value: 1}, {key: 'display2', value: 2}];
    scope.selectionMsg = 'see this';
    scope.selectHandler = function(value) { handlerResult = value;};
    element = $compile(_element)(scope);
    scope.$apply();
    done();
  });

  describe('on initialize', function() {
    it('should show the selection info message', function() {
      var buttonDisplay = element.find('button');
      expect(buttonDisplay.text()).to.contain(scope.selectionMsg);
    });

    context('on button click', function() {
      beforeEach(function(done) {
        element = $compile(_element)(scope);
        element.find('button').click();
        scope.$digest();
        done();
      });

      it('should have display list of all options without selection info', function() {
        var list = element.find('li').not('.ng-hide');
        expect(list.length).to.equal(scope.availableOptions.length);
      });
    });
  });

  describe('on selecting an option', function() {
    beforeEach(function(done) {
      element = $compile(_element)(scope);
      element.find('button').click();
      element.find('li').not('.ng-hide').find('a')[0].click();
      scope.$digest();
      done();
    });

    it('should display the selection on the button', function() {
      var buttonDisplay = element.find('button');
      expect(buttonDisplay.text()).to.contain(scope.availableOptions[0].key);
    });

    it('should show the selection info with the list of options', function() {
      element.find('button').click();
      var list = element.find('li').not('.ng-hide');
      expect(list.length).to.equal(2 + scope.availableOptions.length);
    });
  });
});
