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
    return ApiService.get(`/placements/${childClientId}`).then(
      response => response.data
    );
  }
}

export default ClientService;
