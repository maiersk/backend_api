const msg = (msg, ...payload) => {
  return { msg, payload }
}
const err = (err, ...payload) => {
  return { err, payload }
}
const data = (data, ...payload) => {
  return { data, payload }
}

export { msg, err, data }
