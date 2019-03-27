const items = {}

class MockSiteClient {
  constructor() {
    this.items = items
  }
}

const SiteClient = jest.fn()

SiteClient.mockImplementation(() => new MockSiteClient)

export {SiteClient, items}
