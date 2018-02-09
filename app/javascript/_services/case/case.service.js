// import ApiService from '../api';
import HttpService from '../http-service';

class CaseService extends HttpService {
  static PREFIX = '/cases';
  fetch(caseId = '0Ki') {
    return this.get(`${caseId}`);
  }
}

export default CaseService;
