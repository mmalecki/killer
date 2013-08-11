#!/usr/bin/env node
process.on('SIGTERM', function () {
  console.log('Suck it.');
});
require('net').createServer().listen(0);
