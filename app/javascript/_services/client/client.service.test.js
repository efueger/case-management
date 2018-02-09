import ClientService from './client.service';

describe('ClientService', () => {
  describe('#fetch', () => {
    let client;
    let service;

    beforeEach(() => {
      client = { get: jest.fn().mockReturnValue(Promise.resolve([])) };
      service = new ClientService(client);
    });

    it('calls ApiService', () => {
      service.fetch();
      expect(client.get).toHaveBeenCalledWith('/0YIPkZU0S0');
      service.fetch('12345');
      expect(client.get).toHaveBeenCalledWith('/12345');
    });

    describe('#fetchSafetyAlerts', () => {
      it('applies args to client.get', () => {
        service.fetchSafetyAlerts();
        expect(client.get).toHaveBeenCalledWith('/R06FKZ20X5/safety_alerts');
        service.fetchSafetyAlerts('42');
        expect(client.get).toHaveBeenCalledWith('/42/safety_alerts');
        expect(client.get).toHaveBeenCalledTimes(2);
      });
    });
  });
});
