import React, { useState } from 'react';
import { geoGraticule, geoPath, geoCircle } from 'd3-geo';
import { data } from './data/world';
import { returnMapProjection } from './App';
import { Subtitle, SVGText } from '../styles/appStyle';

export default function GlobeCreator({
  latLng,
  setLatLng,
  setSelectedCountries,
  selectedCountries,
  mapProj,
  mapColors,
  setTooltip,
  userData,
  labels,
  gradient,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    const speedFactor = -2;
    if (isDragging) {
      if (mapProj == 'orthographic' || mapProj == 'geognomic') {
        setLatLng([
          latLng[0] + (position.x - e.clientX) / speedFactor,
          latLng[1] - (position.y - e.clientY) / speedFactor,
        ]);
        setPosition({ x: e.clientX, y: e.clientY });
      } else {
        setLatLng([latLng[0] + (position.x - e.clientX) / speedFactor, 0]);
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const mapMargin = 24;
  const width = 400;
  const height = 400;

  const projection = returnMapProjection(mapProj)
    .fitExtent(
      [
        [mapMargin, mapMargin],
        [width - mapMargin, height - mapMargin],
      ],
      data
    )
    .rotate(latLng);

  const geoPathGenerator = geoPath().projection(projection);
  const graticule = geoGraticule().step([10, 10]);
  const allSvgPaths = data.features.map((shape: any) => {
    return (
      <path
        style={{ cursor: 'pointer' }}
        onMouseMove={(e) =>
          setTooltip({ visible: true, x: e.pageX - 10, y: e.pageY + 20, countryName: shape.properties.name })
        }
        onMouseEnter={HighlightCountry}
        onMouseLeave={(e) => mouseExit(e, setTooltip)}
        onClick={(e) => SelectCountry(e, selectedCountries, setSelectedCountries)}
        key={shape.id}
        d={shape && geoPathGenerator(shape)}
        stroke={mapColors.countryOutline}
        fill={returnCountryFillColor(shape.properties.name, selectedCountries, mapColors)}
        data-countryname={shape.properties.name}
      />
    );
  });
  const allLabels = data.features.map((shape: any) => {
    let centroid = geoPathGenerator.centroid(shape);
    let countryName = shape.properties.name;
    if (labels == 'selected' && selectedCountries.includes(countryName)) {
      const index = selectedCountries.indexOf(countryName);
      if (index > -1) {
        return (
          <SVGText key={shape.id} x={centroid[0]} y={centroid[1]} fill={'black'} data-countryname={countryName}>
            {countryName}
          </SVGText>
        );
      }
    } else if (labels == 'all') {
      return (
        <SVGText key={shape.id} x={centroid[0]} y={centroid[1]} fill={'black'} data-countryname={countryName}>
          {countryName}
        </SVGText>
      );
    }
  });

  return (
    <div>
      <svg
        width={400}
        height={400}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={() => handleMouseUp()}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={() => handleMouseUp()}
      >
        <defs>
          <radialGradient id="myGradient">
            <stop offset="70%" stopColor="rgba(0,0,0,0)" />
            <stop offset="95%" stopColor="rgba(0,0,0,.15)" />
          </radialGradient>
        </defs>
        <path
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          d={`${geoPathGenerator({ type: 'Sphere' })}`}
          stroke={mapColors.graticule}
          strokeWidth="2px"
          fill={mapColors.oceanFill}
        ></path>

        {gradient && (
          <path
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            d={`${geoPathGenerator({ type: 'Sphere' })}`}
            stroke={mapColors.graticule}
            strokeWidth="2px"
            fill="url('#myGradient')"
          ></path>
        )}
        <path
          d={`${geoPathGenerator(graticule())}`}
          stroke={mapColors.graticule}
          strokeOpacity={mapColors.graticuleOpacity}
          fill="none"
        ></path>

        {allSvgPaths}
        {allLabels}
        {userData.map((dataset) =>
          dataset.data.map((datapoints) =>
            mapProj == 'orthographic' ? (
              <path
                fill={dataset.fillColor}
                stroke={dataset.outlineColor}
                d={geoPathGenerator(geoCircle().center([datapoints.lng, datapoints.lat]).radius(datapoints.r)())}
              />
            ) : (
              <circle
                fill={dataset.fillColor}
                stroke={dataset.outlineColor}
                cx={projection([datapoints.lng, datapoints.lat])[0]}
                cy={projection([datapoints.lng, datapoints.lat])[1]}
                r={datapoints.r}
              />
            )
          )
        )}
      </svg>
      <Subtitle> Click country to highlight, click and drag to rotate</Subtitle>
    </div>
  );
}

function returnCountryFillColor(countryName, selectedCountries, mapColors) {
  if (selectedCountries.includes(countryName)) {
    const index = selectedCountries.indexOf(countryName);
    if (index > -1) {
      return mapColors.selectedCountry;
    }
  } else {
    return mapColors.countryFill;
  }
}
function SelectCountry(e, selectedCountries, setSelectedCountries) {
  if (selectedCountries.includes(e.target.dataset.countryname)) {
    const index = selectedCountries.indexOf(e.target.dataset.countryname);
    if (index > -1) {
      selectedCountries.splice(index, 1); // 2nd parameter means remove one item only
    }
  } else {
    selectedCountries.push(e.target.dataset.countryname);
  }
  setSelectedCountries(selectedCountries);
}

function HighlightCountry(e) {
  e.target.style.opacity = 0.8;
  e.target.style.strokeWidth = 2;
}
function mouseExit(e, setTooltip) {
  e.target.style.opacity = 1;
  e.target.style.strokeWidth = 1;
  setTooltip({ visible: false, x: 0, y: 0, countryName: '' });
}
