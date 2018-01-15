import React from 'react';
import { mount, shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';
import { BootstrapTable } from 'react-bootstrap-table';

describe('<DashboardContainer />', () => {
  it('renders a <DataGridCard /> of Cases', () => {
    const wrapper = shallow(<DashboardContainer />);
    wrapper.setState({
      cases: {
        status: 'ready',
        records: [{ identifier: '1' }, { identifier: '2' }],
      },
    });
    const cases = mount(
      wrapper
        .instance()
        .renderCases()
        .props.render()
    );
    expect(cases.type()).toBe(BootstrapTable);
    expect(cases.prop('data').length).toBe(2);
  });

  it('renders a <DataGridCard /> of Referrals', () => {
    const wrapper = shallow(<DashboardContainer />);
    wrapper.setState({
      referrals: {
        status: 'ready',
        records: [
          { identifier: '1' },
          { identifier: '2' },
          { identifier: '3' },
        ],
      },
    });
    const referrals = mount(
      wrapper
        .instance()
        .renderReferrals()
        .props.render()
    );
    expect(referrals.type()).toBe(BootstrapTable);
    expect(referrals.prop('data').length).toBe(3);
  });
});
