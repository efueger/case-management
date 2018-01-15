import React from 'react';
import DataGridCard from './DataGridCard';
import { shallow } from 'enzyme';

describe('DataGridCard', () => {
  it('renders', () => {
    expect(() => shallow(<DataGridCard />)).not.toThrow();
  });

  it('renders an empty card', () => {
    const wrapper = shallow(<DataGridCard status="idle" />);
    expect(wrapper.children().length).toBe(0);
  });

  it('renders an error', () => {
    const OnError = () => <div>ERROR</div>;
    const wrapper = shallow(
      <DataGridCard status="error" renderOnError={() => <OnError />} />
    );
    expect(wrapper.find(OnError).exists()).toBe(true);
  });

  it('renders empty result set', () => {
    const OnEmpty = () => <div>NOTHING TO SEE HERE</div>;
    const wrapper = shallow(
      <DataGridCard status="ready" empty renderOnEmpty={() => <OnEmpty />} />
    );
    expect(wrapper.find(OnEmpty).exists()).toBe(true);
  });

  it('renders waiting indicator', () => {
    const wrapper = shallow(<DataGridCard status="waiting" />);
    expect(wrapper.children().text()).toEqual('waiting...');
  });

  it('renders the renderProp', () => {
    const myRender = jest.fn();
    myRender.mockImplementation(() => <div>HELLO WORLD</div>);
    const wrapper = shallow(<DataGridCard status="ready" render={myRender} />);
    expect(myRender).toHaveBeenCalledWith();
    expect(wrapper.children().text()).toEqual('HELLO WORLD');
  });

  describe('default renderers', () => {
    describe('onEmpty', () => {
      it('renders an Alert of type info', () => {
        const wrapper = shallow(<DataGridCard status="ready" empty />);
        const alertComponent = wrapper.find('Alert').first();
        expect(alertComponent.exists()).toBe(true);
        expect(alertComponent.prop('alertClassName')).toEqual('info');
      });
    });

    describe('onError', () => {
      it('renders an Alert of type error', () => {
        const wrapper = shallow(<DataGridCard status="error" />);
        const alertComponent = wrapper.find('Alert').first();
        expect(alertComponent.exists()).toBe(true);
        expect(alertComponent.prop('alertClassName')).toEqual('error');
      });
    });
  });
});
