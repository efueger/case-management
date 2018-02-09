import React, { PureComponent } from 'react';
import EsriLoaderReact from 'esri-loader-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RelatedClientShape, FocusChildShape } from '../../shapes';

class PlacementMap extends PureComponent {
  static propTypes = {
    relatedClients: PropTypes.arrayOf(RelatedClientShape),
    focusChild: FocusChildShape,
  };

  ARCGIS_VERSION = 4.6;

  ARCGIS_MODULES = [
    'esri/Map',
    'esri/views/MapView',
    'esri/Graphic',
    'esri/geometry/Point',
    'esri/geometry/Multipoint',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/layers/FeatureLayer',
    'esri/widgets/Legend',
    'esri/renderers/SimpleRenderer',
    'esri/renderers/UniqueValueRenderer',
  ];

  FIELDS = [
    {
      name: 'identifier',
      alias: 'identifier',
      type: 'oid',
    },
    {
      name: 'title',
      alias: 'title',
      type: 'string',
    },
    {
      name: 'type',
      alias: 'type',
      type: 'string',
    },
  ];

  constructor(props) {
    super(props);
    this.handleEsriLoaderReady = this.handleEsriLoaderReady.bind(this);
    this.state = {
      isLoaded: false,
    };
  }

  extractModules(loadedModules, amdPaths = this.ARCGIS_MODULES) {
    const names = amdPaths.map(path => path.split('/').pop());
    this.loadedModules = [...loadedModules].reduce(
      (accumulator, module, i) => ({ ...accumulator, [names[i]]: module }),
      {}
    );
  }

  get esriLoaderOptions() {
    return { url: `https://js.arcgis.com/${this.ARCGIS_VERSION}/` };
  }

  initMap() {
    const { Map, MapView } = this.loadedModules;
    this.map = new Map({ basemap: 'streets' });
    this.view = new MapView({
      center: [-121.46, 38.66],
      container: this.mapEl,
      map: this.map,
      zoom: 11,
    });
  }

  createFocusChildGraphic() {
    const { focusChild: { address: { longitude, latitude } } } = this.props;
    const { Point } = this.loadedModules;
    return {
      geometry: new Point({
        longitude,
        latitude,
      }),
      attributes: {
        ObjectId: 'FOCUS_CHILD',
        title: 'THE FOCUS_CHILD',
        type: 'focusChild',
      },
    };
  }

  createRelatedClientsGraphics() {
    const { relatedClients } = this.props;
    const { Point } = this.loadedModules;
    return relatedClients.map(client => ({
      geometry: new Point({
        longitude: client.address.longitude,
        latitude: client.address.latitude,
      }),
      attributes: {
        ObjectID: client.identifier,
        title: client.title || 'Related Client',
        type: 'relatedClient',
      },
    }));
  }

  createGraphics() {
    const { relatedClients, focusChild } = this.props;
    const graphics = [];
    if (relatedClients) graphics.push(...this.createRelatedClientsGraphics());
    if (focusChild) graphics.push(this.createFocusChildGraphic());
    return graphics;
  }

  createLayer(graphics) {
    const {
      FeatureLayer,
      SimpleMarkerSymbol,
      UniqueValueRenderer,
    } = this.loadedModules;

    const myUniqueValueRenderer = new UniqueValueRenderer({
      field: 'type',
      defaultSymbol: { type: 'simple-marker' },
      defaultLabel: 'PlaceHolder',
      legendOptions: {
        title: 'Address Type',
      },
      uniqueValueInfos: [
        {
          value: 'focusChild',
          symbol: new SimpleMarkerSymbol({
            color: 'blue',
          }),
          label: 'Focus Child',
        },
        {
          value: 'relatedClient',
          symbol: new SimpleMarkerSymbol({
            color: 'red',
          }),
          label: 'Related Client',
        },
      ],
    });

    const layer = new FeatureLayer({
      source: graphics,
      fields: this.FIELDS,
      objectIdField: 'identifier',
      geometryType: 'point',
      spatialReference: { wkid: 4326 },
      popupTemplate: {
        title: 'Some Related Client',
        content: '{title}',
      },
      renderer: myUniqueValueRenderer,
    });
    this.map.add(layer);
    return layer;
  }

  drawPointLayer() {
    const graphics = this.createGraphics();
    this.createLayer(graphics);
  }

  createLegend() {
    const { Legend } = this.loadedModules;
    const featureLayer = this.map.layers.getItemAt(0);
    const legend = new Legend({
      view: this.view,
      layerInfos: [
        {
          layer: featureLayer,
          title: 'Address Layer',
        },
      ],
    });
    this.view.ui.add(legend, 'bottom-right');
  }

  handleEsriLoaderReady({ loadedModules }) {
    this.setState({ isLoaded: true });
    this.extractModules(loadedModules);
    this.initMap();
    this.view.when(() => {
      const center = [
        this.props.focusChild.address.longitude,
        this.props.focusChild.address.latitude,
      ];
      this.view.goTo(center);
      this.drawPointLayer();
      this.createLegend();
    });
  }

  render() {
    return (
      <div className="map-container" style={{ height: '600px' }}>
        {!this.state.isLoaded && (
          <div
            style={{
              backgroundColor: '#dbdddd',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid grey',
            }}
          >
            <h3>Loading...</h3>
          </div>
        )}
        <EsriLoaderReact
          options={this.esriLoaderOptions}
          modulesToLoad={this.ARCGIS_MODULES}
          renderMapContainer={false}
          onReady={this.handleEsriLoaderReady}
        >
          <div
            ref={element => {
              this.mapEl = element;
            }}
            className={classNames({
              hidden: !this.state.isLoaded,
            })}
            style={{
              padding: 0,
              margin: 0,
              height: '100%',
              width: '100%',
            }}
          />
        </EsriLoaderReact>
      </div>
    );
  }
}

export default PlacementMap;
