import ApiService from '../api';

class RelationshipService {
  static fetch(id) {
    return ApiService.get(`/relationships/${id}?token=null`).then(
      response => response.data
    );
  }
}

export default RelationshipService;
