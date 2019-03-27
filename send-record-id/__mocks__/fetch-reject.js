const fetch = jest.fn((url, options) => Promise.resolve({status: 200}));

export default fetch;
