var path = require('path'),
    assert = require('assert'),
    spawn = require('child_process').spawn,
    killer = require('../lib/killer'),
    cb = require('assert-called');

var pid = spawn(path.join(__dirname, 'fixtures', 'server.js')).pid,
    d = new Date();

console.log('pid: ' + pid);
killer({
  pid: pid,
  timeout: 20000,
  interval: 500
}, cb(function () {
  assert.throws(function () {
    process.kill(child.pid, 0);
  });

  assert((new Date() - d) > 400);
  assert((new Date() - d) < 25000);
}));
