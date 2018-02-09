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
    it('constructs a GET request', () => {});
  });

  // describe('#fetch', () => {
  //   it('forms a GET request', () => {
  //     const spy = jest.fn({
  //       get:
  //     })
  //   });
  //   // it('calls fetch ApiService', () => {
  //   //   getSpy.mockReturnValue(Promise.resolve({}));
  //   //   expect(getSpy).not.toHaveBeenCalled();
  //   //   ChildClientService.fetch();
  //   //   expect(getSpy).toHaveBeenCalledWith('/child_clients/AazXkWY06s');
  //   // });

  //   // it('calls csec from ApiService', () => {
  //   //   getSpy.mockReturnValue(Promise.resolve({}));
  //   //   ChildClientService.csec();
  //   //   expect(getSpy).toHaveBeenCalledWith('/child_clients/AazXkWY06s/csec');
  //   // });
  // });
});
