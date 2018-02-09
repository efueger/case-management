import CaseService from './case.service';

describe('CaseService', () => {
  describe('#fetch', () => {
    it('makes GET requests', () => {
      const spy = jest.fn();
      const service = new CaseService({ get: spy });
      service.fetch();
      expect(spy).toHaveBeenCalledWith('0Ki');
      service.fetch('SOME_CLIENT_ID');
      expect(spy).toHaveBeenCalledWith('SOME_CLIENT_ID');
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
