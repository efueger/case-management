import * as React from 'react';
import { shallow } from 'enzyme';
import PlacementMap from './PlacementMap';

describe('PlacementMap', () => {
  it('renders', () => {
    expect(() => shallow(<PlacementMap />)).not.toThrow();
  });

  describe('#esriLoaderOptions', () => {
    it('is defined', () => {
      const instance = shallow(<PlacementMap />).instance();
      const opts = instance.esriLoaderOptions;
      expect(opts).toBeDefined();
      expect(opts.url).toEqual(jasmine.any(String));
    });
  });

  describe('#initMap', () => {
    it('initializes the map and mapView using loadedModules', () => {
      const wrapper = shallow(<PlacementMap />);
      const instance = wrapper.instance();
      const [MapMock, MapViewMock] = [jest.fn(), jest.fn()];
      instance.loadedModules = { Map: MapMock, MapView: MapViewMock };
      instance.initMap();
      expect(MapMock).toHaveBeenCalledTimes(1);
      expect(MapViewMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('#extractModules', () => {
    it('places modules on the class instance', () => {
      const wrapper = shallow(<PlacementMap />);
      const instance = wrapper.instance();
      const MyModuleFn = jest.fn();
      instance.extractModules([MyModuleFn], ['foo/bar/biz/MyModule']);
      expect(instance.loadedModules).toEqual({ MyModule: MyModuleFn });
    });

    it('uses ARCGIS_MODULES by deafult', () => {
      const wrapper = shallow(<PlacementMap />);
      const instance = wrapper.instance();
      expect(instance.ARCGIS_MODULES).toBeDefined();
      const MyModuleFn = jest.fn();
      const modules = instance.ARCGIS_MODULES.map(_ => MyModuleFn);
      instance.extractModules(modules);
      expect(instance.loadedModules.Map).toBe(MyModuleFn);
      expect(instance.loadedModules.SimpleMarkerSymbol).toBe(MyModuleFn);
    });
  });

  describe('#createFocusChildGraphic', () => {
    it('creates a graphic from focusChild prop', () => {
      const focusChild = {
        identifier: '123',
        address: { longitude: 42, latitude: -42 },
      };
      const Point = jest.fn();
      const instance = shallow(
        <PlacementMap focusChild={focusChild} />
      ).instance();
      expect(instance.createFocusChildGraphic).toEqual(jasmine.any(Function));
      instance.loadedModules = { Point };
      instance.createFocusChildGraphic();
      expect(Point).toHaveBeenCalledWith(focusChild.address);
    });
  });

  describe('#createRelatedClientsGraphics', () => {
    it('creates an array of graphics for each relatedClient', () => {
      const relatedClients = [
        { identifier: 'one', address: { latitude: 42, longitude: -42 } },
        { identifier: 'two', address: { latitude: 22, longitude: -22 } },
        { identifier: 'three', address: { latitude: 33, longitude: -33 } },
      ];
      const instance = shallow(
        <PlacementMap relatedClients={relatedClients} />
      ).instance();
      const Point = jest.fn();
      instance.loadedModules = { Point };
      instance.createRelatedClientsGraphics();
      expect(Point).toHaveBeenCalledTimes(3);
    });
  });

  describe('#createGraphics', () => {
    it('returns an array of all point data', () => {
      const address = { latitude: 42, longitude: 42 };
      const relatedClients = [{ identifier: '2', address }];
      const focusChild = { identifier: '1', address };
      const instance = shallow(
        <PlacementMap relatedClients={relatedClients} focusChild={focusChild} />
      ).instance();
      expect(instance.createGraphics).toEqual(jasmine.any(Function));
      const createFocusChildGraphicSpy = jest
        .spyOn(instance, 'createFocusChildGraphic')
        .mockImplementation(() => ({}));
      const createRelatedClientsGraphicsSpy = jest
        .spyOn(instance, 'createRelatedClientsGraphics')
        .mockImplementation(() => [{}]);
      instance.createGraphics();
      expect(createFocusChildGraphicSpy).toHaveBeenCalledWith();
      expect(createRelatedClientsGraphicsSpy).toHaveBeenCalledWith();
    });
  });

  describe('#createLayer', () => {
    it('adds a layer to the map', () => {
      const instance = shallow(<PlacementMap />).instance();
      const FeatureLayer = jest.fn().mockImplementation(() => ({}));
      const SimpleMarkerSymbol = jest.fn().mockImplementation(() => ({}));
      const UniqueValueRenderer = jest.fn().mockImplementation(() => ({}));
      instance.loadedModules = {
        FeatureLayer,
        SimpleMarkerSymbol,
        UniqueValueRenderer,
      };
      instance.map = { add: jest.fn() };
      instance.createLayer();
      expect(FeatureLayer).toHaveBeenCalledTimes(1);
      expect(SimpleMarkerSymbol).toHaveBeenCalledTimes(2);
      expect(UniqueValueRenderer).toHaveBeenCalledTimes(1);
      expect(instance.map.add).toHaveBeenCalledTimes(1);
    });
  });

  describe('#drawPointLayer', () => {
    it('delegates mapping operations', () => {
      const instance = shallow(<PlacementMap />).instance();
      const createGraphicsSpy = jest
        .spyOn(instance, 'createGraphics')
        .mockImplementation(() => 'MY_GRAPHICS');
      const createLayerSpy = jest
        .spyOn(instance, 'createLayer')
        .mockImplementation(() => {});
      instance.drawPointLayer();
      expect(createGraphicsSpy).toHaveBeenCalledWith();
      expect(createLayerSpy).toHaveBeenCalledWith('MY_GRAPHICS');
    });
  });

  describe('#createLegend', () => {
    it('adds a legend to the map', () => {
      const instance = shallow(<PlacementMap />).instance();
      expect(instance.createLegend).toEqual(jasmine.any(Function));
      const mockLegendInstance = {};
      const Legend = jest.fn().mockImplementation(() => mockLegendInstance);
      instance.loadedModules = { Legend };
      instance.map = {
        layers: {
          getItemAt: jest.fn().mockImplementation(() => 'LAYER'),
        },
      };
      instance.view = {
        ui: {
          add: jest.fn(),
        },
      };
      instance.createLegend();
      expect(Legend).toHaveBeenCalledTimes(1);
      expect(instance.map.layers.getItemAt).toHaveBeenCalledWith(0);
      expect(instance.view.ui.add).toHaveBeenCalledWith(
        mockLegendInstance,
        'bottom-right'
      );
    });
  });

  describe('#handleEsriLoaderReady', () => {
    let wrapper;
    let instance;
    const noop = () => {};

    beforeEach(() => {
      wrapper = shallow(<PlacementMap />);
      wrapper.setProps({
        focusChild: {
          address: {
            longitude: 42,
            latitude: -42,
          },
        },
      });
      instance = wrapper.instance();
      jest.spyOn(instance, 'extractModules').mockImplementation(noop);
      jest.spyOn(instance, 'initMap').mockImplementation(noop);
      jest.spyOn(instance, 'drawPointLayer').mockImplementation(noop);
      jest.spyOn(instance, 'createLegend').mockImplementation(noop);
      instance.view = {
        when: cb => cb(),
        goTo: jest.fn(),
      };
    });

    it('sets the state `isLoaded`', () => {
      expect(wrapper.state('isLoaded')).toEqual(false);
      instance.handleEsriLoaderReady({ loadedModules: [] });
      expect(wrapper.state('isLoaded')).toBe(true);
    });

    it('fires callbacks', () => {
      instance.handleEsriLoaderReady({ loadedModules: ['Foo'] });
      expect(instance.extractModules).toHaveBeenCalledWith(['Foo']);
      expect(instance.initMap).toHaveBeenCalledWith();
      expect(instance.view.goTo).toHaveBeenCalledTimes(1);
      expect(instance.drawPointLayer).toHaveBeenCalledWith();
      expect(instance.createLegend).toHaveBeenCalledWith();
    });
  });
});
