module.exports = function (options, callback) {
  function tryKill(pid, signal) {
    try {
      process.kill(pid, signal);
      return true;
    }
    catch (ex) {
      return false;
    }
  }

  function check() {
    //
    // Signal `0` doesn't do any harm to the target process but raises an
    // exception when process doesn't exist.
    //
    if (!tryKill(pid, 0)) {
      clearTimeout(termTimer);
      clearInterval(checkTimer);
      return callback();
    }
  }

  if (typeof options === 'number' || typeof options === 'string') {
    options = {
      pid: parseInt(options, 10)
    };
  }

  var pid = options.pid,
      timeout = options.timeout || 10000,
      termSignal = options.termSignal || 'SIGTERM',
      killSignal = options.killSignal || 'SIGKILL',
      interval = options.interval,
      checkTimer, termTimer;

  callback = callback || function () {};

  if (typeof interval === 'undefined' || interval === true) {
    interval = 100;
  }

  if (!tryKill(pid, termSignal)) {
    return callback();
  }

  if (interval) {
    checkTimer = setInterval(check, interval);
    check();
  }

  termTimer = setTimeout(function () {
    tryKill(pid, termSignal);
    callback();
  }, timeout);
};
