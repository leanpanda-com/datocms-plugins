const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve))
}

export default flushPromises
