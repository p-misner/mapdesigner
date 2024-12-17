import React from 'react';
import {
  CheckboxRowLayout,
  ColorInput,
  ColorInputsWrapper,
  ColorRowLayout,
  ControlContentWrapper,
  ControlDropdown,
  GroupHeading,
  GroupLabel,
  LabelSideWrapper,
  PresetColorDiv,
  PresetColorDivWrapper,
  PresetColorsWrapper,
  RowLayout,
  Spacer8px,
} from '../styles/appStyle';
import { PresetColorsData } from './data/mapData';

export const StyleControlPanel = ({ mapColors, setMapProj, setLatLng, setMapColors, gradient, setGradient }) => {
  return (
    <ControlContentWrapper>
      <RowLayout>
        <GroupLabel htmlFor="mapProj">Map Projection</GroupLabel>
        <ControlDropdown id="mapProj" name="mapProj" onChange={(e) => handleInputChange(e, setMapProj, setLatLng)}>
          <option value="orthographic">Orthographic (Globe)</option>
          <option value="mercator">Mercator</option>
          <option value="equalearth">Equal Earth</option>

          <option value="geoconicequidistant">Geo Conic Equidistant</option>
          <option value="geoconicequalarea">Geo Conic Equal Area</option>
        </ControlDropdown>
      </RowLayout>
      <Spacer8px />
      <LabelSideWrapper>
        <GroupHeading> Colors</GroupHeading>
        <ColorInputsWrapper>
          <ColorRowLayout>
            <label>Country Fill</label>
            <ColorInput
              type="color"
              name="countryfill"
              value={mapColors.countryFill}
              onChange={(e) =>
                setMapColors(colorUpdate({ category: 'countryFill', newColor: e.target.value, mapColors: mapColors }))
              }
            />
          </ColorRowLayout>
          <ColorRowLayout>
            <label>Ocean Fill</label>

            <ColorInput
              type="color"
              name="oceanfill"
              value={mapColors.oceanFill}
              onChange={(e) =>
                setMapColors(colorUpdate({ category: 'oceanFill', newColor: e.target.value, mapColors: mapColors }))
              }
            />
          </ColorRowLayout>

          <ColorRowLayout>
            <label>Country Outline</label>

            <ColorInput
              type="color"
              name="countryoutline"
              value={mapColors.countryOutline}
              onChange={(e) =>
                setMapColors(
                  colorUpdate({ category: 'countryOutline', newColor: e.target.value, mapColors: mapColors })
                )
              }
            />
          </ColorRowLayout>
          <ColorRowLayout>
            <label>Selected Country</label>

            <ColorInput
              type="color"
              name="selectedcountry"
              value={mapColors.selectedCountry}
              onChange={(e) =>
                setMapColors(
                  colorUpdate({ category: 'selectedCountry', newColor: e.target.value, mapColors: mapColors })
                )
              }
            />
          </ColorRowLayout>
          <ColorRowLayout>
            <label>
              Graticule <span> (Lines)</span>
            </label>

            <ColorInput
              type="color"
              name="graticule"
              value={mapColors.graticule}
              onChange={(e) =>
                setMapColors(colorUpdate({ category: 'graticule', newColor: e.target.value, mapColors: mapColors }))
              }
            />
          </ColorRowLayout>
          <CheckboxRowLayout>
            <input
              type="checkbox"
              id="gradient"
              name="gradient"
              checked={gradient}
              onChange={() => setGradient(!gradient)}
            />
            <label htmlFor="gradient">Show Globe Gradient</label>
          </CheckboxRowLayout>
        </ColorInputsWrapper>
        <Spacer8px />
        <Spacer8px />
        <GroupHeading> Preset Colors</GroupHeading>
        <Spacer8px />
        <PresetColorSelection setMapColors={setMapColors} mapColors={mapColors} />
        <Spacer8px />
        <Spacer8px />
      </LabelSideWrapper>
    </ControlContentWrapper>
  );
};

const PresetColorSelection = ({ setMapColors, mapColors }: { setMapColors: any; mapColors: MapColorType }) => {
  return (
    <PresetColorsWrapper>
      {PresetColorsData.map((x) => (
        <PresetStyleColors
          key={x.label}
          label={x.label}
          colorObj={x.colors}
          setMapColors={setMapColors}
          mapColors={mapColors}
        />
      ))}
    </PresetColorsWrapper>
  );
};

const PresetStyleColors = ({
  label,
  colorObj,
  setMapColors,
  mapColors,
}: {
  setMapColors: any;
  mapColors: MapColorType;
  label: string;
  colorObj: MapColorType;
}) => {
  return (
    <PresetColorDivWrapper
      selected={deepEqual(colorObj, mapColors)}
      onClick={() => {
        setMapColors({ ...colorObj });
      }}
    >
      {label}
      {Object.values(colorObj)
        .filter((x) => typeof x == 'string')
        .map((x, i) => (
          <PresetColorDiv key={`${label}-${i}-${x}`} color={x} />
        ))}
    </PresetColorDivWrapper>
  );
};

export type MapColorType = {
  countryFill: string;
  oceanFill: string;
  selectedCountry: string;
  graticule: string;
  countryOutline: string;
  graticuleOpacity: number;
};
function handleInputChange(e, setMapProj, setLatLng) {
  setMapProj(e.target.value);
  setLatLng([0, 0]);
}
function colorUpdate({
  category,
  newColor,
  mapColors,
}: {
  category: string;
  newColor: string;
  mapColors: MapColorType;
}) {
  mapColors[category] = newColor;
  return { ...mapColors };
}

function deepEqual(x, y) {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
}
