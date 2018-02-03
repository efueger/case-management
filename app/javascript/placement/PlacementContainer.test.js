import React from 'react';
import { shallow } from 'enzyme';
import PlacementContainer from './PlacementContainer';

jest.mock('../_services/client');
const ClientService = require('../_services/client').default;

describe('PlacementContainer', () => {
  let match;
  let history;

  const mkWrapper = props =>
    shallow(<PlacementContainer match={match} history={history} {...props} />);

  const thenCallBack = () => ({ then: cb => cb() });

  beforeEach(() => {
    match = {
      params: {
        clientId: 'my-client-id',
      },
    };
    history = {
      push: jest.fn().mockImplementation(() => {}),
    };
    ClientService.getRelatedClientsByChildClientId.mockImplementation(
      thenCallBack
    );
  });

  afterEach(() => {
    ClientService.getRelatedClientsByChildClientId.mockReset();
    ClientService.getRelatedClientsByChildClientId.mockClear();
  });

  it('renders', () => {
    const wrapper = mkWrapper();
    expect(!!wrapper).toBe(true);
  });

  describe('#fetchRelatedClients', () => {
    it('delegates to ClientService', () => {
      const instance = mkWrapper().instance();
      jest.spyOn(instance, 'getClientId').mockReturnValue('foo');
      ClientService.getRelatedClientsByChildClientId
        .mockReset()
        .mockImplementation(thenCallBack);
      instance.fetchRelatedClients();
      expect(
        ClientService.getRelatedClientsByChildClientId
      ).toHaveBeenCalledTimes(1);
      expect(
        ClientService.getRelatedClientsByChildClientId
      ).toHaveBeenCalledWith('foo');
    });
  });

  describe('#fetchFocusChild', () => {
    it('mocks focusChild retrieval (until service integration)', () => {
      const wrapper = mkWrapper();
      expect(wrapper.instance().fetchFocusChild).toEqual(jasmine.any(Function));
      expect(wrapper.state('focusChild')).toEqual({
        XHRStatus: 'idle',
      });
      wrapper.instance().fetchFocusChild();
      process.nextTick(() => {
        const focusChild = wrapper.state('focusChild');
        expect(focusChild.XHRStatus).toEqual('ready');
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
