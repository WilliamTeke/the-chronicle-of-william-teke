import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import worldData from 'world-atlas/countries-50m.json';
import { HERITAGE_LOCATIONS } from '../data/geography';

const world = worldData as unknown as Topology<{ countries: GeometryCollection; land: GeometryCollection }>;
const land = feature(world, world.objects.land);
const countries = feature(world, world.objects.countries);
const places = [
  { city: 'Fort Lauderdale', code: 'US', detail: 'Florida, USA · Pop. 182K', connection: 'Born & raised here', label: 'Fort Lauderdale' },
  { city: 'Santander', code: 'CO', detail: 'Department · Colombia', connection: 'Mom & grandmother', label: 'Santander (region)' },
  { city: 'Bogotá', code: 'CO', detail: 'Colombia · Pop. 7.7M', connection: 'Grandfather', label: 'Bogotá' },
  { city: 'Çiftlikköy', code: 'TR', detail: 'Yalova · Turkey', connection: 'Dad is from here', label: 'Çiftlikköy' },
  { city: 'Yalova', code: 'TR', detail: 'Turkey · Pop. 262K', connection: 'Grandmother', label: 'Yalova' },
  { city: 'Uchkulan', code: 'RU', detail: 'Russia · Pop. ~5K', connection: 'Grandfather', label: 'Uchkulan' },
].map(place => {
  const location = HERITAGE_LOCATIONS.find(location => location.label === place.label)!;
  const [longitude, latitude] = location.coordinates;
  const projection = geoOrthographic().rotate([-longitude, -latitude]).translate([70, 70]).scale(64).clipAngle(90);
  const path = geoPath(projection);
  return {
    ...place, longitude, latitude,
    land: path(land) ?? '',
    country: path(countries.features.find(country => String(country.id) === location.country)!) ?? '',
    grid: path(geoGraticule10()) ?? '',
  };
});

export default function HeritageAtlas() {
  return (
    <div className="heritage-atlas" aria-labelledby="heritage-atlas-title">
      <div className="atlas-heading">
        <div><span className="atlas-eyebrow">A personal atlas</span><h3 id="heritage-atlas-title">Different places. One story.</h3></div>
        <span className="atlas-count">06 places <span aria-hidden="true">/</span> 04 countries</span>
      </div>
      <div className="atlas-grid">
        {places.map((place, index) => (
          <a className="atlas-place" key={place.city}
            href={`https://www.openstreetmap.org/?mlat=${place.latitude}&mlon=${place.longitude}#map=10/${place.latitude}/${place.longitude}`}
            target="_blank" rel="noopener noreferrer" aria-label={`Explore ${place.city} on OpenStreetMap (opens in a new tab)`}>
            <div className="atlas-place-top"><span className="atlas-index">0{index + 1}</span><span className="atlas-country">{place.code}</span><span className="atlas-arrow" aria-hidden="true">↗</span></div>
            <svg className="atlas-miniature" viewBox="0 0 140 140" aria-hidden="true">
              <circle cx="70" cy="70" r="64" className="atlas-ocean" />
              <path d={place.grid} className="atlas-graticule" />
              <path d={place.land} className="atlas-land" />
              <path d={place.country} className="atlas-highlight" />
              <circle cx="70" cy="70" r="9" className="atlas-marker-ring" />
              <circle cx="70" cy="70" r="3" className="atlas-marker" />
            </svg>
            <div className="atlas-place-copy"><p className="atlas-connection">{place.connection}</p><h4>{place.city}</h4><p className="atlas-detail">{place.detail}</p></div>
          </a>
        ))}
      </div>
      <p className="atlas-footnote">The places that connect my family. <span>Select a place to explore the map ↗</span></p>
    </div>
  );
}
