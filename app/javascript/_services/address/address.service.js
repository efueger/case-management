import ApiService from '../api';

class AddressService {
  static fetch(id) {
    return ApiService.get(`/addresses/${id}`).then(response => response.data);
  }
}

export default AddressService;
