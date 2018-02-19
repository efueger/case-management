import ApiService from '../api';

class CaseService {
  static fetch() {
    return ApiService.get('/cases/00L').then(response => response.data);
  }
}

export default CaseService;
