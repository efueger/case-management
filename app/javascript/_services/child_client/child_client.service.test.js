import ChildClientService from './child_client.service';

describe('ChildClientService', () => {
  it('exists', () => {
    expect(!!ChildClientService).toBeTruthy();
  });

  describe('#fetch', () => {
    it('constructs a GET request', () => {
      const spy = jest.fn().mockReturnValue(Promise.resolve({ data: [] }));
      const service = new ChildClientService({ get: spy });
      service.fetch();
      expect(spy).toHaveBeenCalledWith('/AazXkWY06s');
      service.fetch('SOME_CLIENT_ID');
      expect(spy).toHaveBeenCalledWith('/SOME_CLIENT_ID');
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('#csec', () => {
    it('constructs a GET request', () => {
      const spy = jest.fn().mockReturnValue(Promise.resolve({ data: [] }));
      const service = new ChildClientService({ get: spy });
      service.csec();
      expect(spy).toHaveBeenCalledWith('/AazXkWY06s/csec');
      service.csec('12345');
      expect(spy).toHaveBeenCalledWith('/12345/csec');
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
