import React from 'react';
import { shallow, mount } from 'enzyme';
import ICWA from './ICWA.js';
import { BootstrapTable } from 'react-bootstrap-table';

describe('<ICWA />', () => {
  it('renders a <DataGridCard /> of ICWA', () => {
    const wrapper = shallow(<ICWA />);
    wrapper.setState({
      indianAncestry: {
        status: 'ready',
        records: [{ id: '1' }, { id: '2' }, { id: '3' }],
      },
    });
    const indian = mount(
      wrapper
        .instance()
        .notificationsInfo()
        .props.render()
    );
    expect(indian.type()).toBe(BootstrapTable);
    expect(indian.prop('data').length).toBe(3);
  });
});
