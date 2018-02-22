import React from 'react';
import { shallow } from 'enzyme';
import RelationsCard from './RelationsCard.js';

describe('RelatedClientCard', () => {
  let component;
  beforeEach(() => {
    component = shallow(<RelationsCard />);
  });

  it('renders', () => {
    expect(() => {
      shallow(<RelationsCard />);
    }).not.toThrow();
  });

  it('renders BootsstrapTable Component', () => {
    expect(component.find('BootstrapTable').length).toEqual(1);
    expect(component.find('TableHeaderColumn').length).toEqual(7);
  });
});
