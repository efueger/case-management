import BaseHttpService from '../http-service';

class AddressService extends BaseHttpService {
  static PREFIX = '/addresses';
  fetch(id) {
    // console.log(this._client);
    return this.client.get(`/${id}`).then(response => response.data);
  }
}

export default AddressService;
