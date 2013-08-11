# killer
It makes sure that your processes are dead.

## Usage

### `killer(options, callback)`

#### `options`

If `options` is a string or a number, it's assumed to be the PID. Defaults are
used for all other options.

  * `pid` - PID of the process to kill
  * `interval` - How often to check if process is still alive (default: 1000). Setting to `false` disables polling.
  * `killSignal` - which signal to use to kill the process (default: `SIGKILL`)
  * `termSignal` - which signal to use to terminate the process after timeout (default: `SIGTERM`)
  * `timeout` - when to send `termSignal` to the process (default: 10000).

#### `callback`
Called when process is dead.
