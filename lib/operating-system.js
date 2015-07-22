var os = require('os');

module.exports = OperatingSystem;

function OperatingSystem() {
  this.home = home;
  this.platform = platform;

  function home() {
    return platform() === 'windows' ? process.env.HOMEPATH : process.env.HOME;
  }

  function platform() {
    switch (os.platform()) {
      case 'linux': {
        return 'linux';
      }
      case 'darwin': {
        return 'osx';
      }
      case 'win32':
      case 'win64': {
        return 'windows';
      }
      default: {
        return 'other';
      }
    }
  }
}
