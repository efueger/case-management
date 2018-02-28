import ApiService from '../api';

class ChildClientService {
  static fetch() {
    return ApiService.get('/child_clients/0YIPkZU0S0').then(
      response => response.data
    );
  }

  static csec() {
    return ApiService.get('/child_clients/AazXkWY06s/csec').then(
      response => response.data
    );
  }
}

export default ChildClientService;
