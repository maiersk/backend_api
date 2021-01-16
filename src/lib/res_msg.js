function resPayload (success, data, payload) {
  let result = { success }

  result[0] = data
  if (payload.length) {
    result.payload = payload
  }
  return result
}

const msg = (msg, ...payload) => {
  return resPayload(true, msg, payload)
}
const err = (err, ...payload) => {
  return resPayload(false, err, payload)
}
const data = (data, ...payload) => {
  return resPayload(true, data, payload)
}

export { msg, err, data }
