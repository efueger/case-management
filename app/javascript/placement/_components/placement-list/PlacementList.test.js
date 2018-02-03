import React from 'react';
import { shallow } from 'enzyme';
import PlacementList from './PlacementList';

describe('PlacementList', () => {
  it('renders', () => {
    expect(() => {
      shallow(<PlacementList />);
    }).not.toThrow();
  });
});
