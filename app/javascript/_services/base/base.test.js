import axios from 'axios';
import BaseService from './base';

describe('BaseService', () => {
  it('creates an instance of axios', () => {
    jest.spyOn(axios, 'create').mockReturnValueOnce('INSTANCE');
    const myService = new BaseService();
    expect(myService).toBeDefined();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: `/api${BaseService.PREFIX}`,
      timeout: 5000,
    });
  });

  describe('instance methods', () => {
    let myService;
    let mockInstance;

    beforeEach(() => {
      myService = new BaseService();
      mockInstance = {
        request: jest.fn(),
        get: jest.fn(),
        delete: jest.fn(),
        head: jest.fn(),
        options: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
      };
      // jest.spyOn(myService, 'axios', 'get').mockReturnValue(mockInstance);
      Object.defineProperty(myService, 'client', {
        get: jest.fn(() => mockInstance),
      });
    });

    describe('#request', () => {
      it('delegates to client#request', () => {
        myService.request('foo');
        expect(mockInstance.request).toHaveBeenCalledWith('foo');
      });
    });

    describe('#get', () => {
      it('delegates to client#get', () => {
        myService.get('foo');
        expect(mockInstance.get).toHaveBeenCalledWith('foo');
      });
    });

    describe('#delete', () => {
      it('delegates to client#delete', () => {
        myService.delete('foo');
        expect(mockInstance.delete).toHaveBeenCalledWith('foo');
      });
    });

    describe('#head', () => {
      it('delegates to client#head', () => {
        myService.head('foo');
        expect(mockInstance.head).toHaveBeenCalledWith('foo');
      });
    });

    describe('#options', () => {
      it('delegates to client#options', () => {
        myService.options('foo');
        expect(mockInstance.options).toHaveBeenCalledWith('foo');
      });
    });

    describe('#post', () => {
      it('delegates to client#post', () => {
        myService.post('foo');
        expect(mockInstance.post).toHaveBeenCalledWith('foo');
      });
    });

    describe('#put', () => {
      it('delegates to client#put', () => {
        myService.put('foo');
        expect(mockInstance.put).toHaveBeenCalledWith('foo');
      });
    });

    describe('#patch', () => {
      it('delegates to client#patch', () => {
        myService.patch('foo');
        expect(mockInstance.patch).toHaveBeenCalledWith('foo');
      });
    });
  });
});

describe('BaseService Extensions', () => {
  it('works', () => {
    class FooService extends BaseService {
      static PREFIX = '/foo';
    }
    const myFooService = new FooService();
    expect(myFooService.client.defaults.baseURL).toMatch('/api/foo');
  });
});
