function resPayload (success, data, name, payload) {
  let result = { success }

  result[name] = data
  if (payload.length) {
    result.payload = payload
  }
  return result
}

const msg = (msg, ...payload) => {
  return resPayload(true, msg, 'msg', payload)
}
const err = (err, ...payload) => {
  return resPayload(false, err, 'err', payload)
}
const data = (data, ...payload) => {
  return resPayload(true, data, 'data', payload)
}

export { msg, err, data }
