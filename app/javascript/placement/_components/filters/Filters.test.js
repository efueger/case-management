import React from 'react';
import { shallow } from 'enzyme';
import Filters from './Filters';

describe('PlacementFilters', () => {
  it('renders', () => {
    expect(() => {
      shallow(<Filters />);
    }).not.toThrow();
  });
});
