const flushPromises = () => new Promise(resolve => setImmediate(resolve))

export default flushPromises
