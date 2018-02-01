import React from 'react';
import { shallow } from 'enzyme';
import RaceEthnicityForm from './RaceEthnicityForm.js';

describe('Ethnicity', () => {
  let component;

  beforeEach(() => {
    component = shallow(<RaceEthnicityForm />);
  });

  it('renders card Component', () => {
    expect(component.find('Cards').length).toBe(1);
  });

  it('renders Ethnicity Component', () => {
    expect(component.find('Ethnicity').length).toBe(1);
  });
});
