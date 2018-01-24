import AddressService from './address.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('AddressService', () => {
  it('exists', () => {
    expect(!!AddressService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      expect(getSpy).not.toHaveBeenCalled();
      AddressService.fetch();
      expect(getSpy).toHaveBeenCalledWith(jasmine.any(String));
    });
  });
});
