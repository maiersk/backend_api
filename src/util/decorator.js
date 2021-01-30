export function page (model) {
  return async (target, name, descriptor) => {
    console.log('?')
    console.log(descriptor)
    descriptor.value()
  }
}
