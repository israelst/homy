var expect = require('chai').expect;
var sinon = require('sinon');

var ConfigurationBasedFinder = require('./configuration-based-finder');

var Q = require('q');
var os = require('os');

describe('ConfigurationBasedFinder', function () {
  var configurationBasedFinder, configurationParser, fileSystem;

  beforeEach(function () {
    configurationParser = {
      parse: sinon.stub()
    };

    fileSystem = {
      listDirectory: sinon.stub(),
      readFile: sinon.stub()
    };

    configurationBasedFinder = new ConfigurationBasedFinder(fileSystem, configurationParser);
  });

  it('should find files by configuration', function (done) {
    fileSystem.listDirectory.returns(promiseOf([
      'path/to/symlinks.yml',
      'another-file'
    ]));

    fileSystem.readFile.withArgs('path/to/symlinks.yml').returns(promiseOf('the configuration'));

    configurationParser.parse.withArgs('the configuration').returns(promiseOf([
      {
        name: '.file1',
        target: '.file1'
      },
      {
        name: '.file2',
        target: 'inner/.file2'
      }
    ]));

    configurationBasedFinder.findSymlinks()
      .then(function (symlinks) {
        expect(symlinks).to.deep.equal([
          {
            name: '.file1',
            target: 'path/to/.file1'
          },
          {
            name: '.file2',
            target: 'path/to/inner/.file2'
          }
        ]);
      })
      .done(done);
  });

  function multiline(lines) {
    return lines.join(os.EOL);
  }

  function promiseOf(value) {
    return Q.when(value);
  }
});
