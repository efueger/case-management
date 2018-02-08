import axios from 'axios';

class BaseHttpService {
  static NAMESPACE = '/api';
  static PREFIX = '';
  constructor(
    client = axios.create({
      baseURL: `${this.constructor.NAMESPACE}${this.constructor.PREFIX}`,
      timeout: 5000,
    })
  ) {
    this._client = client;
  }
  get client() {
    return this._client;
  }
  request(...args) {
    return this.client.request.apply(this.client, args);
  }
  get(...args) {
    return this.client.get.apply(this.client, args);
  }
  delete(...args) {
    return this.client.delete.apply(this.client, args);
  }
  head(...args) {
    return this.client.head.apply(this.client, args);
  }
  options(...args) {
    return this.client.options.apply(this.client, args);
  }
  post(...args) {
    return this.client.post.apply(this.client, args);
  }
  put(...args) {
    return this.client.put.apply(this.client, args);
  }
  patch(...args) {
    return this.client.patch.apply(this.client, args);
  }
}

export default BaseHttpService;
