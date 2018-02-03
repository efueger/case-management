import React from 'react';
import { shallow } from 'enzyme';
import PlacementApp from './PlacementApp';

describe('PlacementApp component', () => {
  it('renders', () => {
    expect(() => {
      shallow(<PlacementApp />);
    }).not.toThrow();
  });
});
