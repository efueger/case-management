import ApiService from '../api';

class ChildClientService {
  static fetch() {
    return ApiService.get('/child_clients/AazXkWY06s').then(
      response => response.data
    );
  }
}

export default ChildClientService;
