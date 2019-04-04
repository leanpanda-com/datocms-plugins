const fetch = jest.fn((url, options) =>
  new Promise((resolve, reject) => {
    if (url !== 'invalid.url') {
      return resolve({ status: 200 });
    } else {
      return reject({ status: 500 });
    }
  })
);

export default fetch;
