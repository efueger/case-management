import AddressService from './address.service';

describe('AddressService', () => {
  describe('client configuration', () => {
    it('sets the baseURL', () => {
      const myService = new AddressService();
      const { baseURL } = myService.client.defaults;
      expect(baseURL).toMatch(/\/addresses$/);
    });

    it('is sets the timeout', () => {
      const myService = new AddressService();
      const { timeout } = myService.client.defaults;
      expect(timeout).toBeDefined();
    });
  });

  describe('#fetch', () => {
    it('makes a GET request', () => {
      const clientMock = {
        get: jest.fn(),
      };
      const myService = new AddressService(clientMock);
      myService.fetch('123');
      expect(clientMock.get).toHaveBeenCalledWith('/123');
    });
  });
});
