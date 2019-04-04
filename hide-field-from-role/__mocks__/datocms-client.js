const roles = {}

class MockSiteClient {
  constructor() {
    this.roles = roles
  }
}

const SiteClient = jest.fn(() => new MockSiteClient)

export {SiteClient, roles}
