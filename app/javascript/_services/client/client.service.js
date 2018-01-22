import ApiService from '../api';

class ClientService {
  static fetch() {
    return ApiService.get('/clients/0YIPkZU0S0').then(
      response => response.data
    );
  }
}

export default ClientService;
