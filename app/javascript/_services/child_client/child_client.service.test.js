import ChildClientService from './child_client.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('ChildClientService', () => {
  it('exists', () => {
    expect(!!ChildClientService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls fetch ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      expect(getSpy).not.toHaveBeenCalled();
      ChildClientService.fetch();
      expect(getSpy).toHaveBeenCalledWith('/child_clients/CtMFii209X');
    });

    it('calls csec from ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      ChildClientService.csec();
      expect(getSpy).toHaveBeenCalledWith('/child_clients/AazXkWY06s/csec');
    });

    it('calls indianAncestory from ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      ChildClientService.indianAncestory();
      expect(getSpy).toHaveBeenCalledWith(
        '/child_clients/Ek694Ij0Wl/indian-ancestry-notifications'
      );
    });
  });
});
