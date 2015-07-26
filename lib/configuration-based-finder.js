var Q = require('q');
var path = require('path');

module.exports = ConfigurationBasedFinder;

function ConfigurationBasedFinder(fileSystem, configurationParser) {
  this.findSymlinks = findSymlinks;

  function findSymlinks() {
    return Q.when([]);
  }
}
