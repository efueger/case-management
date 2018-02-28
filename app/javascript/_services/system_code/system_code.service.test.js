import SystemCodeService from './system_code.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('SystemCodeService', () => {
  it('exists', () => {
    expect(!!SystemCodeService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls fetch ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      expect(getSpy).not.toHaveBeenCalled();
      SystemCodeService.fetch();
      expect(getSpy).toHaveBeenCalledWith('/system_codes/AazXkWY06s');
    });
  });
});
