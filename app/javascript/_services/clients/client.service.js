import ApiService from '../api';

class ClientService {
  static fetch() {
    return ApiService.get('/cases/0Ki').then(response => response.data);
  }
}

export default ClientService;
