import { RFR_RSPC } from '../codes';

/* eslint-disable camelcase */
export function replaceResponseType(referral, codes = RFR_RSPC) {
  const systemCode = codes.find(
    sysCode => sysCode.system_id === referral.referral_response_type
  );
  const referral_response_type = systemCode ? systemCode.short_description : '';
  return {
    ...referral,
    referral_response_type,
  };
}
/* eslint-enable camelcase */
