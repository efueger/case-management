import HttpService from '../http-service';
import { replaceResponseType, joinReceiveDateTime } from './transforms';

class ReferralService extends HttpService {
  static PREFIX = '/referrals';

  fetch(id = '0Ki') {
    return this.get(`/${id}`)
      .then(response => response.data)
      .then(referrals => {
        return referrals
          .map(referral => replaceResponseType(referral))
          .map(referral => joinReceiveDateTime(referral));
      });
  }
}

export default ReferralService;
