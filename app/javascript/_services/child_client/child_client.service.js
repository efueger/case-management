import ApiService from '../api';

class ChildClientService {
  static fetch() {
    return ApiService.get('/child_clients/CtMFii209X').then(
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
      '/child-clients/Ek694Ij0Wl/indian-ancestry-notifications'
    ).then(response => response.data);
  }
}

export default ChildClientService;
