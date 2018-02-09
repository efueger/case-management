import HttpService from '../http-service';

class ClientService extends HttpService {
  static PREFIX = '/clients';

  fetch(clientId = '0YIPkZU0S0') {
    return this.get(`/${clientId}`).then(response => response.data);
  }

  fetchSafetyAlerts(id = 'R06FKZ20X5') {
    return this.get(`/${id}/safety_alerts`).then(response => response.data);
  }

  getRelatedClientsByChildClientId(childClientId) {
    return this.get(`/${childClientId}`, {
      baseURL: `${this.constructor.NAMESPACE}/placements`,
    }).then(response => response.data);
  }
}

export default ClientService;
