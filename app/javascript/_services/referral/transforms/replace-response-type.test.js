import { replaceResponseType } from './replace-response-type';

describe('replaceResponseType', () => {
  it('is a function', () => {
    expect(replaceResponseType).toEqual(jasmine.any(Function));
  });

  it('maps #referral_response_type to `code.short_description`', () => {
    const codes = [{ system_id: 1, short_description: 'foo' }];
    const referral = { referral_response_type: 1 };
    expect(replaceResponseType(referral, codes)).toEqual({
      referral_response_type: 'foo',
    });
  });

  it('maps to an empty string when no match found', () => {
    const codes = [];
    const referral = { referral_response_type: 1 };
    expect(replaceResponseType(referral, codes)).toEqual({
      referral_response_type: '',
    });
  });

  it('loads RFR_RSPC as default codes', () => {
    expect(() => {
      replaceResponseType({});
    }).not.toThrow();
  });
});
