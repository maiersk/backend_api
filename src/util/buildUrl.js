function buildUrl (json) {
  let comp = []
  for (const item in json) {
    comp.push(`${item}=${encodeURIComponent(json[item])}`)
  }
  return comp.join('&amp;')
}

export default buildUrl
