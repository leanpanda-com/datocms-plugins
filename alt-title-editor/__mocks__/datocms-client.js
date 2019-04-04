const items = {}
const uploads = {}

class MockSiteClient {
  constructor() {
    this.items = items
    this.uploads = uploads
  }
}

const SiteClient = jest.fn(() => new MockSiteClient)

export {SiteClient, items, uploads}
