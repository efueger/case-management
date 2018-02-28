import ApiService from '../api';

class SystemCodeService {
  static fetch() {
    return ApiService.get('/system_codes/ETHNCTYC').then(
      response => response.data
    );
  }
}

export default SystemCodeService;
