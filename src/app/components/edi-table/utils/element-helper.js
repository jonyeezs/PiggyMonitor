module.exports = {
  findClosetTableId: function (ele) {
    var id = keepFindingTheTableId({
      ele: ele,
      idFound: false
    });

    if (id == null) {
      throw 'edi-tr-multi-select error: no id given to parent edi-table or table';
    }
    return id;

    function keepFindingTheTableId(eleState) {
      eleState.tablesFound = eleState.tablesFound || 0;

      if (eleState.tablesFound > 1) throw 'edi-tr-multi-select error: could not find parent edi-table or edi-tr. Can only be used on this two elements';

      let result = findParentTableWithId(eleState.ele);

      if (result.idFound) {
        return result.ele.attr('id');
      } else {
        result.tablesFound = result.elementFound ? ++eleState.tablesFound : eleState.tablesFound;
        return keepFindingTheTableId(result);
      }
    }

    function findParentTableWithId(ele) {
      let eleTag = ele.prop('tagName');
      let elementFound = (eleTag === 'TABLE' || eleTag === 'EDI-TABLE');
      let idFound = elementFound && ele.attr('id') != undefined;
      return {
        ele: idFound ? ele : ele.parent(),
        elementFound: elementFound,
        idFound: idFound
      };
    }
  },
  elementIs: function (ele, similarTagNames) {
    var singleSimilarTagNames = similarTagNames
    .filter(function(name) {
      return !name.includes('>');
    })
    .map(function(name) {
      return name.toUpperCase();
    });

    return singleSimilarTagNames.some(function(name) {
      return name === ele.prop('tagName')
    }) ? true
      : anyMatchingNestedTagNames(ele, similarTagNames);

    function anyMatchingNestedTagNames(ele, similarTagNames) {
      similarTagNames = similarTagNames
      .filter(function(name) {
        return name.includes('>');
      })
      .map(function(name) {
        return name.replace(' ', '').toUpperCase();
      });

      return similarTagNames.some(function(names) {
        names = names.split('>');
        return names[0] === ele.prop('tagName')
          && ele.children().some(function(ele) {
            return ele.tagName === names[1];
          })
      });
    }
  }
}
