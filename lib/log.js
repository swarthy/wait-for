module.exports = {
  consoleError(quiet, ...args) {
    if (!quiet) {
      console.error(...args)
    }
  }
}
