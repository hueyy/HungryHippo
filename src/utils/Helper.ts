const cleanup = (string) => string.replace(/[^\d !"#$%&()-_`a-z{|}~]*/g, ``)

const Helper = {
  cleanup
}

export default Helper