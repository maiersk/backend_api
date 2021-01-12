function resPayload (data, name, payload) {
  let result = {}
  result[name] = data
  if (payload.length) {
    result.payload = payload
  }
  return result
}

const msg = (msg, ...payload) => {
  return resPayload(msg, 'msg', payload)
}
const err = (err, ...payload) => {
  return resPayload(err, 'err', payload)
}
const data = (data, ...payload) => {
  return resPayload(data, 'data', payload)
}

export { msg, err, data }
