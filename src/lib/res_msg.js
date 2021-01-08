export default {
  msg(msg, ...payload) {
    return { msg, ...payload }
  },
  err(err, ...payload) {
    return { err, ...payload }
  },
  data(data, ...payload) {
    return { data, ...payload }
  }
}