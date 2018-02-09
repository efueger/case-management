import AddressService from './address.service';

describe('AddressService', () => {
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
