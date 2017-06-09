var csvParse = require('csv-parse');
module.exports = csv;

csv.$inject = [];
function csv() {
  return {
    parse: csvParse,
  };
}
