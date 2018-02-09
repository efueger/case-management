import BaseHttpService from '../http-service';

class AddressService extends BaseHttpService {
  static PREFIX = '/addresses';
  fetch(id) {
    if (!id) throw new TypeError('missing required argument: `id`.');
    return this.get(`/${id}`);
  }
}

export default AddressService;
