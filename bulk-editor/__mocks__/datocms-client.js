const mockItemsAll = jest.fn()
const mockItemsUpdate = jest.fn()

class MockSiteClient {
  constructor() {
    this.items = {
      all: mockItemsAll,
      update: mockItemsUpdate
    }
  }
}

const SiteClient = jest.fn()

SiteClient.mockImplementation(() => new MockSiteClient)

export {SiteClient, mockItemsAll, mockItemsUpdate}
