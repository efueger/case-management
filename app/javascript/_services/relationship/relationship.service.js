import HttpService from '../http-service';

class RelationshipService extends HttpService {
  static PREFIX = '/relationships';
  fetch(id) {
    return this.get(`/${id}`).then(response => response.data);
  }
}

export default RelationshipService;
