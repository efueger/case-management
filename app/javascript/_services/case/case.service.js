import ApiService from '../api';

class CaseService {
  static fetch() {
    return ApiService.get('/cases/0Ki/index').then(d => d.data);
  }
}

export default CaseService;
