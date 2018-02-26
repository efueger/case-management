import ApiService from '../api';

class ChildClientService {
  static fetch() {
    return ApiService.get('/child_clients/Ek694Ij0Wl').then(
      response => response.data
    );
  }

  static csec() {
    return ApiService.get('/child_clients/AazXkWY06s/csec').then(
      response => response.data
    );
  }

  static indianAncestory() {
    return ApiService.get(
      '/child_clients/Ek694Ij0Wl/indian_ancestry_notifications'
    ).then(response => response.data);
  }
}

export default ChildClientService;
