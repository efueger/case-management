import HttpService from '../http-service';

class ChildClientService extends HttpService {
  static PREFIX = '/child_clients';
  fetch(childClientId = 'AazXkWY06s') {
    return this.get(`/${childClientId}`).then(response => response.data);
  }
  csec(childClientId = 'AazXkWY06s') {
    return this.get(`/${childClientId}/csec`).then(response => response.data);
  }
}

export default ChildClientService;
