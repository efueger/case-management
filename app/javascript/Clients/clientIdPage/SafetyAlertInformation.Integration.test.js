import React from 'react';
import { shallow, mount } from 'enzyme';
import SafetyAlertInformation from './SafetyAlertInformation.js';
import { BootstrapTable } from 'react-bootstrap-table';

describe('<SafetyAlertInformation />', () => {
  it('renders a <DataGridCard /> of SafetyAlertInformation', () => {
    const wrapper = shallow(<SafetyAlertInformation />);
    wrapper.setState({
      safetyAlerts: {
        status: 'ready',
        records: [{ client_id: '1' }, { client_id: '2' }, { client_id: '3' }],
      },
    });
    const safetyAlerts = mount(
      wrapper
        .instance()
        .alertInfo()
        .props.render()
    );
    expect(safetyAlerts.type()).toBe(BootstrapTable);
    expect(safetyAlerts.prop('data').length).toBe(3);
  });
});
