import ApiService from '../api';

class ClientService {
  static fetch() {
    return ApiService.get('/clients/0YIPkZU0S0').then(
      response => response.data
    );
  }

  static fetchSafetyAlerts() {
    return ApiService.get('/clients/R06FKZ20X5/safety_alerts').then(
      response => response.data
    );
  }

  static getRelatedClientsByChildClientId(childClientId) {
    // return ApiService.get(`/placement/${childClientId}/relatedClients`).then(
    //   response => response.data
    // );
    return Promise.resolve([
      {
        identifier: '1',
        title: 'I AM FOO',
        address: {
          latitude: 38.51,
          longitude: -121.63,
        },
      },
      {
        identifier: '2',
        title: 'I AM BAR',
        address: {
          latitude: 38.51,
          longitude: -121.57,
        },
      },
      {
        identifier: '3',
        title: 'QUO',
        address: {
          latitude: 38.55,
          longitude: -121.56,
        },
      },
      {
        identifier: '4',
        title: 'QUX',
        address: {
          latitude: 38.61,
          longitude: -121.62,
        },
      },
      {
        identifier: '5',
        title: 'SOME TITLE',
        address: {
          latitude: 38.53,
          longitude: -121.59,
        },
      },
    ]);
  }
}

export default ClientService;
