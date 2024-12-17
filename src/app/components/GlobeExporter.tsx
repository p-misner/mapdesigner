import { geoGraticule, geoPath, geoCircle } from 'd3-geo';
import { data } from './data/world';
import { returnMapProjection } from './App';
export default function GlobeExporter({ latLng, mapColors, mapProj, userData, gradient }) {
  /* Setting up Export Constants*/
  let exportPathHolder = [];
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

  /* Adding in Country SVG  Data */
  exportPathHolder.push({
    colors: mapColors,
    countryData: [],
    userData: [],
  });
  exportPathHolder[0].countryData.push({
    d: geoPathGenerator({ type: 'Sphere' }),
    countryName: 'ocean',
    selected: false,
  });

  if (gradient) {
    exportPathHolder[0].countryData.push({
      d: geoPathGenerator({ type: 'Sphere' }),
      countryName: 'gradient',
      selected: false,
    });
  }

  let graticule = geoGraticule().step([10, 10]);

  exportPathHolder[0].countryData.push({
    selected: false,
    d: geoPathGenerator(graticule()),
    countryName: 'graticule',
  });

  data.features.map((shape: any) => {
    geoPathGenerator(shape) !== null &&
      exportPathHolder[0].countryData.push({
        selected: false,
        d: geoPathGenerator(shape),
        countryName: shape.properties.name,
      });
  });

  /* Adding in Datapoints and User Added Data */
  userData.map((dataset) =>
    dataset.data.map((datapoints) =>
      mapProj == 'orthographic'
        ? exportPathHolder[0].userData.push({
            type: 'geoCircle',
            d: geoPathGenerator(geoCircle().center([datapoints.lng, datapoints.lat]).radius(datapoints.r)()),
            fill: dataset.fillColor,
            stroke: dataset.outlineColor,
          })
        : exportPathHolder[0].userData.push({
            type: 'circle',
            x: projection([datapoints.lng, datapoints.lat])[0],
            y: projection([datapoints.lng, datapoints.lat])[1],
            r: datapoints.r,
            fill: dataset.fillColor,
            stroke: dataset.outlineColor,
          })
    )
  );

  return exportPathHolder;
}
