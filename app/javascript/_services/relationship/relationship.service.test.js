import RelationshipService from './relationship.service';

describe('RelationshipService', () => {
  describe('#fetch', () => {
    let client;
    let service;

    beforeEach(() => {
      client = { get: jest.fn() };
      service = new RelationshipService(client);
    });

    it('calls ApiService', () => {
      client.get.mockReturnValue(Promise.resolve({ data: [] }));
      service.fetch('123').then(data => {
        expect(client.get).toHaveBeenCalledWith('/123');
      });
    });
  });
});
