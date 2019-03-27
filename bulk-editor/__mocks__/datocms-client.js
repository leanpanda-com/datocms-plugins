const items = {}

class MockSiteClient {
  constructor() {
    this.items = items
  }
}

const SiteClient = jest.fn(() => new MockSiteClient)

export {SiteClient, items}
