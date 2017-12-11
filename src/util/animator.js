let cbs = []

export const onFrame = (cb) => {
  cbs.push(cb)
}

export const offFrame = (cb) => {
  cbs.filter(c => c !== cb)
}

export const runFrame = () => {
  cbs.forEach(cb => cb())
}
