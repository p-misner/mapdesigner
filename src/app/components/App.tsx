import React, { useState, useEffect } from 'react';
import { geoOrthographic, geoMercator, geoEqualEarth, geoConicEquidistant, geoConicEqualArea } from 'd3-geo';

import GlobeCreator from './GlobeCreator';
import GlobeExporter from './GlobeExporter';
import '../styles/reset.css';
import {
  ControlsWrapper,
  GlobeWrapper,
  HighlightButton,
  PluginWrapper,
  StandardButton,
  SubmitButtonWrapper,
  TabButton,
  TabGroup,
  TooltipWrapper,
} from '../styles/appStyle';
import DataPanel from './DataPanel';
import { MapColorType, StyleControlPanel } from './StylePanel';

function App() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [latLng, setLatLng] = useState<[number, number]>([0, 0]);
  const [mapProj, setMapProj] = useState<string>('orthographic');
  const [labels, setLabels] = useState<'all' | 'selected' | 'none'>('none');
  const [gradient, setGradient] = useState(false);
  const [mapColors, setMapColors] = useState<MapColorType>({
    countryFill: '#e0f2e7',
    oceanFill: '#d5f7ff',
    selectedCountry: '#0fcd5b',
    graticule: '#666666',
    countryOutline: '#333333',
    graticuleOpacity: 0.2,
  });
  const [userData, setUserData] = useState([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 20,
    y: 20,
    countryName: '',
  });
  const [activeTab, setActiveTab] = useState<'style' | 'adddata' | 'labels'>('style');

  const onCreate = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'create-globe',
          data: GlobeExporter({
            latLng: latLng,
            mapColors: mapColors,
            userData: userData,
            mapProj: mapProj,
            gradient: gradient,
          }),
          selectedCountries: selectedCountries,
        },
      },
      '*'
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-globe') {
        console.log('MESSAGE to UI', message);
      }
    };
  }, []);

  return (
    <PluginWrapper>
      <GlobeWrapper $gradientStart={mapColors.countryFill}>
        {/* <h3> click to select country</h3> */}
        <TooltipWrapper $x={tooltip.x} $y={tooltip.y} $visible={tooltip.visible}>
          {' '}
          {tooltip.countryName}
        </TooltipWrapper>
        {GlobeCreator({
          setLatLng: setLatLng,
          selectedCountries: selectedCountries,
          setSelectedCountries: setSelectedCountries,
          latLng: latLng,
          mapProj: mapProj,
          mapColors: mapColors,
          setTooltip: setTooltip,
          userData: userData,
          labels: labels,
          gradient: gradient,
        })}
      </GlobeWrapper>

      <ControlsWrapper>
        <TabGroup>
          <TabButton typeof="button" $active={activeTab == 'style'} onClick={() => setActiveTab('style')}>
            Style
          </TabButton>
          <TabButton typeof="button" $active={activeTab == 'adddata'} onClick={() => setActiveTab('adddata')}>
            Data Markers
          </TabButton>
          {/* <TabButton typeof="button" $active={activeTab == 'labels'} onClick={() => setActiveTab('labels')}>
            Map Labels
          </TabButton> */}
        </TabGroup>

        {activeTab == 'style' && (
          <StyleControlPanel
            mapColors={mapColors}
            setMapColors={setMapColors}
            setLatLng={setLatLng}
            setMapProj={setMapProj}
            gradient={gradient}
            setGradient={setGradient}
          />
        )}
        {activeTab == 'adddata' && <DataPanel setUserData={setUserData} userData={userData} />}
        {/* {activeTab == 'labels' && <LabelPanel labels={labels} setLabels={setLabels} />} */}

        <SubmitButtonWrapper>
          <HighlightButton id="create" onClick={onCreate}>
            Create
          </HighlightButton>
          <StandardButton onClick={onCancel}>Cancel</StandardButton>{' '}
        </SubmitButtonWrapper>
      </ControlsWrapper>
    </PluginWrapper>
  );
}

export function returnMapProjection(mapProj) {
  switch (mapProj) {
    case 'orthographic':
      return geoOrthographic();
    case 'mercator':
      return geoMercator();
    case 'equalearth':
      return geoEqualEarth();
    case 'geoconicequidistant':
      return geoConicEquidistant();
    case 'geoconicequalarea':
      return geoConicEqualArea();

    default:
      return geoOrthographic();
  }
}

export default App;
