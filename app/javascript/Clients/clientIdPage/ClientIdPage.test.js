import React from 'react';
import { shallow, mount } from 'enzyme';
import ClientIdPage, { formatTable } from './ClientIdPage.js';
import ClientService from '../../_services/client';

describe('ClientIdPage Helper Functions', () => {
  describe('formatTable()', () => {
    it('formats the  object to be pass on react-bootstrap table', () => {
      const data = {
        common_first_name: 'hello',
        common_last_name: 'world',
        address: {
          street_name: 'foo',
          street_number: 'bar',
        },
      };
      const { name, address } = formatTable(data);
      expect(name).toBe('hello world');
      expect(address).toBe('foo bar');
    });

    it('formats the object in the table to data with client birth date and age', () => {
      const data = {
        common_first_name: 'hello',
        common_last_name: 'world',
        address: {
          street_name: 'foo',
          street_number: 'bar',
        },
        birth_dt: '1986-11-06',
      };
      const { age } = formatTable(data);
      expect(age).toBe('31 | 1986-11-06');
    });
  });
});

describe('Client ID Page', () => {
  const pageTitle = 'Child Name';
  let clientPage;

  beforeEach(() => {
    clientPage = shallow(<ClientIdPage />);
  });

  describe('#handleSelect', () => {
    it('stops propagation', () => {
      const event = { stopPropagation: () => {} };
      jest.spyOn(event, 'stopPropagation');
      const wrapper = mount(<ClientIdPage />).instance();
      wrapper.handleSelect('_href', event);
      expect(event.stopPropagation).toHaveBeenCalledWith();
    });
  });

  it('Has Global Header ', () => {
    expect(clientPage.find('GlobalHeader').length).toBe(1);
  });

  it('Has Page Header ', () => {
    expect(clientPage.find('PageHeader').length).toBe(1);
  });

  it('Has ClientInformation', () => {
    expect(clientPage.find('ClientInformation').length).toBe(1);
  });

  it('Has OtherClientInformation', () => {
    expect(clientPage.find('OtherClientInformation').length).toBe(1);
  });

  it('Has Safety Alert Information', () => {
    expect(clientPage.find('SafetyAlertInformation').length).toBe(1);
  });

  it('Has Class Names ', () => {
    expect(
      clientPage
        .find('PageHeader')
        .at(0)
        .props().pageTitle
    ).toBe(pageTitle);
    expect(
      clientPage
        .find('div')
        .at(1)
        .props().className
    ).toBe('container');
    expect(
      clientPage
        .find('div')
        .at(2)
        .props().className
    ).toBe('row');
    expect(
      clientPage
        .find('div')
        .at(3)
        .props().className
    ).toBe('col-sm-3');
    expect(
      clientPage
        .find('div')
        .at(4)
        .props().className
    ).toBe('col-sm-9');
  });

  describe('#fetchRelatedClients', () => {
    let fetchRelatedClientsSpy;

    beforeEach(() => {
      fetchRelatedClientsSpy = jest.spyOn(
        ClientService,
        'getRelatedClientsByChildClientId'
      );
      fetchRelatedClientsSpy.mockReset();
    });

    afterEach(() => {
      fetchRelatedClientsSpy.mockReset();
      fetchRelatedClientsSpy.mockRestore();
    });

    it('calls the ClientService', () => {
      ClientService.getRelatedClientsByChildClientId.mockReturnValueOnce(
        Promise.resolve([])
      );
      expect(fetchRelatedClientsSpy).not.toHaveBeenCalled();
      shallow(<ClientIdPage />).instance();
      expect(fetchRelatedClientsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
