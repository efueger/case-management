import ReferralService from './referral.service';

jest.mock('./transforms', () => {
  return {
    replaceResponseType: jest.fn().mockImplementation(d => d),
    joinReceiveDateTime: jest.fn().mockImplementation(d => d),
  };
});

describe('ReferralService', () => {
  describe('#fetch', () => {
    let client;
    let service;

    beforeEach(() => {
      client = { get: jest.fn() };
      service = new ReferralService(client);
    });

    it('calls ApiService', () => {
      client.get.mockReturnValue(Promise.resolve({ data: [] }));
      service.fetch().then(data => {
        expect(client.get).toHaveBeenCalledWith('/0Ki');
      });
      service.fetch('123').then(data => {
        expect(client.get).toHaveBeenCalledWith('/123');
      });
    });

    it('applies transformations', done => {
      client.get.mockReturnValue(Promise.resolve({ data: [{ a: 1 }] }));
      const {
        replaceResponseType,
        joinReceiveDateTime,
      } = require('./transforms');
      service.fetch().then(() => {
        expect(replaceResponseType).toHaveBeenCalledWith({ a: 1 });
        expect(joinReceiveDateTime).toHaveBeenCalledWith({ a: 1 });
        done();
      });
    });
  });
});
