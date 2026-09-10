import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { land, countries } from '../data/world';
import { HERITAGE_LOCATIONS } from '../data/geography';

const facts = [
  [{ label: 'Population', text: '188,677 city residents (2025 estimate)', source: 'https://www.census.gov/quickfacts/fact/table/fortlauderdalecityflorida/LND110220' }, { label: 'Languages at home', text: '30.1% speak a language other than English (ages 5+, 2020–2024)', source: 'https://www.census.gov/quickfacts/fact/table/fortlauderdalecityflorida/LND110220' }],
  [{ label: 'Population', text: '2.18 million across the department (2018)', source: 'https://en.wikipedia.org/wiki/Santander_Department' }, { label: 'Landscape', text: 'Home to the Chicamocha Canyon', source: 'https://colombia.travel/en/bucaramanga/chicamocha-canyon-unmissable-landscape' }],
  [{ label: 'Role', text: 'Colombia’s capital city', source: 'https://colombia.travel/en/bogota' }, { label: 'Culture', text: 'Gold Museum: around 34,000 gold pieces celebrating pre-Hispanic heritage', source: 'https://colombia.travel/en/bogota/gold-museum' }],
  [{ label: 'Population', text: '50,641 municipal residents (2025)', source: 'https://www.marmara.gov.tr/en/ciftlikkoy-Belediyesi' }, { label: 'Local history', text: 'Surrounding villages reflect migration from the Balkans', source: 'https://www.yalovaciftlikkoy.bel.tr/public/sayfa/koyler' }],
  [{ label: 'Population', text: '130,445 municipal residents (2025)', source: 'https://www.marmara.gov.tr/en/yalova-belediyesi' }, { label: 'Nearby landmark', text: 'Historic hot springs in the Termal district', source: 'https://www.yalova.bel.tr/public/tarihi-merkez/termal/5' }],
  [{ label: 'Setting', text: 'Mountain village in Karachay-Cherkessia, North Caucasus', source: 'https://mapcarta.com/13305048' }, { label: 'Elevation', text: 'Approximately 1,366 metres above sea level', source: 'https://mapcarta.com/13305048' }],
];

const places = [
  { city: 'Fort Lauderdale', code: 'US', detail: 'Florida, USA', connection: 'Born & raised here', label: 'Fort Lauderdale' },
  { city: 'Santander', code: 'CO', detail: 'Department · Colombia', connection: 'Mom & grandmother', label: 'Santander (region)' },
  { city: 'Bogotá', code: 'CO', detail: 'Colombia', connection: 'Grandfather', label: 'Bogotá' },
  { city: 'Çiftlikköy', code: 'TR', detail: 'Yalova · Turkey', connection: 'Dad is from here', label: 'Çiftlikköy' },
  { city: 'Yalova', code: 'TR', detail: 'Turkey', connection: 'Grandmother', label: 'Yalova' },
  { city: 'Uchkulan', code: 'RU', detail: 'Karachay-Cherkessia, Russia', connection: 'Grandfather', label: 'Uchkulan' },
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
          <details className="atlas-place atlas-expandable" key={place.city}>
            <summary aria-label={`Learn about ${place.city}`}>
            <div className="atlas-place-top"><span className="atlas-index">0{index + 1}</span><span className="atlas-country">{place.code}</span><span className="atlas-arrow" aria-hidden="true">+</span></div>
            <svg className="atlas-miniature" viewBox="0 0 140 140" aria-hidden="true">
              <circle cx="70" cy="70" r="64" className="atlas-ocean" />
              <path d={place.grid} className="atlas-graticule" />
              <path d={place.land} className="atlas-land" />
              <path d={place.country} className="atlas-highlight" />
              <circle cx="70" cy="70" r="9" className="atlas-marker-ring" />
              <circle cx="70" cy="70" r="3" className="atlas-marker" />
            </svg>
            <div className="atlas-place-copy"><p className="atlas-connection">{place.connection}</p><h4>{place.city}</h4><p className="atlas-detail">{place.detail}</p></div>
            </summary>
            <div className="atlas-facts"><dl>{facts[index].map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.text} <a href={fact.source} target="_blank" rel="noreferrer" aria-label={`Source for ${place.city}: ${fact.label}`}>↗</a></dd></div>)}</dl>
            <a className="atlas-map-link" href={`https://www.google.com/maps/search/?api=1&query=${place.latitude}%2C${place.longitude}`} target="_blank" rel="noreferrer">Open in Google Maps ↗</a></div>
          </details>
        ))}
      </div>
      <p className="atlas-footnote">The places that connect my family. <span>Select a place for facts and a map</span></p>
    </div>
  );
}
