import AddressService from './address.service';
// import BaseHttpService from '../http-service';
import axios from 'axios';
// import axios from 'axios';
// jest.mock('axios');
// jest.mock('../api');
// const ApiService = require('../api').default;

describe('AddressService', () => {
  it('exists', () => {
    expect(!!AddressService).toBeTruthy();
  });

  describe('#fetch', () => {
    it('calls axios', () => {
      console.log(axios);

      jest
        .spyOn(axios, 'request')
        .mockReturnValueOnce(Promise.resolve({ data: [] }));
      expect(axios.get).not.toHaveBeenCalled();
      new AddressService().fetch();
      expect(axios.get).toHaveBeenCalledWith();
    });
  });
});
