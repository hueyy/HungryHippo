const error = (...arguments_) => console.error(`HungryHippo`, ...arguments_)
const log = (...arguments_) => console.log(`HungryHippo`, ...arguments_)
const warn = (...arguments_) => console.log(`HungryHippo`, ...arguments_)

const Logger = {
  error,
  log,
  warn
}

export default Logger