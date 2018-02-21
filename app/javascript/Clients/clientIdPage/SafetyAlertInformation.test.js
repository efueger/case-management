import React from 'react';
import { shallow } from 'enzyme';
import SafetyAlertInformation from './SafetyAlertInformation.js';

jest.mock('../../_services/client');
let ClientService = require('../../_services/client').default;

describe('#setClients', () => {
  let getSafetyAlertSpy;
  beforeEach(() => {
    getSafetyAlertSpy = jest.spyOn(ClientService, 'fetchSafetyAlerts');
    getSafetyAlertSpy.mockReset();
  });

  afterEach(() => {
    getSafetyAlertSpy.mockRestore();
  });

  it('renders', () => {
    ClientService.fetchSafetyAlerts.mockReturnValue(Promise.resolve());
    expect(() => shallow(<SafetyAlertInformation />)).not.toThrow();
  });

  describe('#fetchSafetyAlerts', () => {
    describe('when records are returned', () => {
      it('returns records', () => {
        ClientService.fetchSafetyAlerts.mockReturnValue(Promise.resolve());
        expect(getSafetyAlertSpy).not.toHaveBeenCalled();
      });

      it('sets XHR status to  ready', () => {
        ClientService.fetchSafetyAlerts.mockReturnValue(Promise.resolve());
        const wrapper = shallow(<SafetyAlertInformation />).instance();
        expect(getSafetyAlertSpy).toHaveBeenCalledTimes(1);
        wrapper.fetchSafetyAlerts();
        expect(getSafetyAlertSpy).toHaveBeenCalledWith();
        expect(getSafetyAlertSpy).toHaveBeenCalledTimes(2);
      });

      it('tracks case api requests', () => {
        ClientService.fetchSafetyAlerts.mockReturnValue(
          Promise.reject(Error('error'))
        );
        const wrapper = shallow(<SafetyAlertInformation />);
        const instance = wrapper.instance();
        return instance.fetchSafetyAlerts().then(safetyAlerts => {
          expect(instance.state.safetyAlerts.XHRStatus).toBe('error');
        });
      });
    });
  });
});

describe('Safety Alert Information', () => {
  let safetyAlert;
  beforeEach(() => {
    safetyAlert = shallow(<SafetyAlertInformation />);
  });

  it('renders a Cards, DropDownFields and CheckboxRadioGroup', () => {
    expect(safetyAlert.find('Cards').length).toBeGreaterThan(0);
  });

  it('should render the Button component', () => {
    expect(safetyAlert.find('Button').length).toEqual(1);
  });

  it('should an event handler that sets state', () => {
    const instance = safetyAlert.instance();
    const myFunction = instance.onChange('myKey');
    expect(() => {
      myFunction({ value: 'myVal' });
    }).not.toThrow();
    expect(instance.state.myKey).toEqual('myVal');
  });

  it('should manage the explanation change', () => {
    const instance = safetyAlert.instance();
    instance.handleExplanationChange({
      target: { value: 'Not Safe environment' },
    });
    expect(instance.state.explanation).toBe('Not Safe environment');
  });

  it('toggles the addAlert flag', () => {
    const wrapper = safetyAlert.instance();
    wrapper.onClick();
    expect(wrapper.state.addAlert).toEqual(true);
    wrapper.onClick();
    wrapper.setState({ addAlert: false });
    expect(wrapper.state.addAlert).toEqual(false);
  });

  it('Verify the components after onclick', () => {
    safetyAlert.setState({ addAlert: true });
    expect(safetyAlert.find('DropDownField').length).toEqual(3);
    expect(safetyAlert.find('TextArea').length).toEqual(2);
    expect(safetyAlert.find('DateTimePicker').length).toEqual(2);
  });

  it('should manage the Deactive change', () => {
    const instance = safetyAlert.instance();
    instance.onChangeDeactive({
      target: { value: 'Carry Guns in Home' },
    });
    expect(instance.state.deactive).toBe('Carry Guns in Home');
  });

  describe('#alertInfo', () => {
    it('function defined', () => {
      const instance = safetyAlert.instance();
      expect(instance.alertInfo()).toBeDefined();
    });

    it('Displays msg if safetyAlerts records are empty', () => {
      const wrapper = safetyAlert.instance();
      wrapper.setState({
        safetyAlerts: { XHRStatus: 'ready' },
      });
      expect(wrapper.alertInfo()).toEqual(
        'Currently No SafetyAlerts. Click AddAlert button to add New Alerts'
      );
    });

    it('displays DataGridCard with Table if safetyAlerts has some records', () => {
      const wrapper = shallow(<SafetyAlertInformation />);
      wrapper.setState({
        safetyAlerts: { XHRStatus: 'ready', records: [{}, {}, {}] },
      });
      expect(
        wrapper.find('DataGridCard').map($el => $el.prop('cardHeaderText'))
      ).toEqual(['SafetyAlerts (3)']);
    });
  });
});
