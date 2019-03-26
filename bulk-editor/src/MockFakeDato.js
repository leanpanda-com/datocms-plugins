class MockFakeDato {
  constructor() {
    this.items = {
      all: jest.fn(() => Promise.resolve([
        {
          id: "12",
        }
      ])),
      update: jest.fn(() => null)
    };
  }
};

export default MockFakeDato;
