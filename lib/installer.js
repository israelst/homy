var Q = require('q');

module.exports = Installer;

function Installer() {
  this.install = install;

  function install() {
    return Q.when(undefined);
  }
}
