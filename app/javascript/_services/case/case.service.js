import ApiService from '../api';

class CaseService {
  static fetch() {
    return ApiService.get('/clients/0YIPkZU0S0').then(
      response => response.data
    );
  }
}

export default CaseService;
