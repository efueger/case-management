import ApiService from '../api';
import { replaceResponseType, joinReceiveDateTime } from './transforms';

class ReferralService {
  static fetch() {
    return ApiService.get('/referrals/00L0')
      .then(response => response.data)
      .then(referrals => {
        return referrals
          .map(referral => replaceResponseType(referral))
          .map(referral => joinReceiveDateTime(referral));
      });
  }
}

export default ReferralService;
