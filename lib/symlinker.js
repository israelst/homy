var path = require('path');

module.exports = Symlinker;

function Symlinker(fileSystem, operatingSystem) {
  this.link = link;

  function dotfile(name) {
    var home = operatingSystem.home();
    return path.join(home, name);
  }

  function link(name, target) {
    return fileSystem.createSymlink(dotfile(name), target);
  }
}
