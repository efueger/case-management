import ApiService from '../api';

class ClientDetailsService {
  static fetch() {
    return ApiService.get('/clientdetails/0YIPkZU0S0').then(
      response => response.data
    );
  }
}

export default ClientDetailsService;
