import React from 'react';
import { shallow } from 'enzyme';
import ClientService from '../_services/client';
import PlacementContainer, {
  fixMisspelling,
  isNotBogusAddress,
} from './PlacementContainer';

describe('PlacementContainer Helper Functions', () => {
  describe('fixMisspelling()', () => {
    it('fixes misspelled `latitude` property', () => {
      const wrong = {
        address: {
          lattitude: 42,
        },
      };
      const { address: { latitude } } = fixMisspelling(wrong);
      expect(latitude).toBe(42);
    });
  });

  describe('isNotBogusAddress()', () => {
    it('is a predicate for lame addresses', () => {
      const mkRecord = () => ({
        address: {
          latitude: 42,
          longitude: -42,
        },
      });
      expect(isNotBogusAddress(mkRecord())).toBeTruthy();
    });
  });
});

describe('PlacementContainer', () => {
  let match;
  let history;

  const mkWrapper = props =>
    shallow(<PlacementContainer match={match} history={history} {...props} />, {
      disableLifecycleMethods: true,
    });

  beforeEach(() => {
    match = {
      params: {
        clientId: 'my-client-id',
      },
    };
    history = {
      push: jest.fn().mockImplementation(() => {}),
    };
  });

  it('renders', () => {
    const wrapper = mkWrapper();
    expect(!!wrapper).toBe(true);
  });

  describe('#fetchRelatedClients', () => {
    it('delegates to ClientService', () => {
      const instance = mkWrapper().instance();
      jest.spyOn(instance, 'getClientId').mockReturnValue('42');
      jest
        .spyOn(ClientService, 'getRelatedClientsByChildClientId')
        .mockReturnValueOnce(Promise.resolve([]));

      instance.fetchRelatedClients();
      expect(
        ClientService.getRelatedClientsByChildClientId
      ).toHaveBeenCalledTimes(1);
      expect(
        ClientService.getRelatedClientsByChildClientId
      ).toHaveBeenCalledWith('42');
    });
  });

  describe('#getClientId', () => {
    it('returns the clientId', () => {
      const instance = mkWrapper().instance();
      expect(instance.getClientId()).toEqual('my-client-id');
    });
  });

  describe('#componentDidMount', () => {
    it('updates state with resolved data', () => {
      const wrapper = mkWrapper();
      const instance = wrapper.instance();
      const focusChild = { identifier: '42' };
      const relatedClient = { identifier: '43' };
      const promise = Promise.resolve([focusChild, relatedClient]);
      jest.spyOn(instance, 'fetchRelatedClients').mockReturnValueOnce(promise);
      jest.spyOn(instance, 'getClientId').mockReturnValue('42');
      instance.componentDidMount();
      process.nextTick(() => {
        expect(wrapper.state('focusChild').record).toEqual(focusChild);
        expect(wrapper.state('focusChild').XHRStatus).toEqual('ready');
      });
    });
  });

  describe('#renderViewPicker', () => {
    it('renders a component', () => {
      const wrapper = mkWrapper();
      wrapper.setState({
        views: [
          { name: 'a', displayName: 'A' },
          { name: 'b', displayName: 'b' },
        ],
      });
      const picker = shallow(wrapper.instance().renderViewPicker());
      expect(picker.find('button').length).toBe(2);
      picker
        .find('button')
        .first()
        .simulate('click');
      expect(history.push).toHaveBeenCalledWith('a');
    });
  });
});
