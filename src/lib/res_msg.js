function resPayload (success, data, payload) {
  let result = { success }

  result.data = data
  if (payload) {
    result = Object.assign({
      ...result,
      ...payload
    })
  }
  return result
}

const msg = (msg, payload) => {
  return resPayload(true, msg, payload)
}
const err = (err, payload) => {
  return resPayload(false, err, payload)
}
const data = (data, payload) => {
  return resPayload(true, data, payload)
}

export { msg, err, data }
