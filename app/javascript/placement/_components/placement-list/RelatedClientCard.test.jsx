import React from 'react';
import { shallow } from 'enzyme';
import RelatedClientCard from './RelatedClientCard';

describe('RelatedClientCard', () => {
  let relatedClient;

  beforeEach(() => {
    relatedClient = {
      identifier: '123',
      common_first_name: 'Luke',
      common_last_name: 'Skywalkder',
      gender_code: 'MALE',
      address: {
        latitude: 42,
        longitude: 42,
      },
    };
  });

  it('renders', () => {
    expect(() => {
      shallow(<RelatedClientCard relatedClient={relatedClient} />);
    }).not.toThrow();
  });
});
