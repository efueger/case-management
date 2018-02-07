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
      expect(getSpy).toHaveBeenCalledWith('/child_clients/AazXkWY06s');
    });

    it('calls csec from ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      ChildClientService.csec();
      expect(getSpy).toHaveBeenCalledWith('/child_clients/AazXkWY06s/csec');
    });
  });
});
