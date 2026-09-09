import { geoDistance } from 'd3-geo';

// Longitude, latitude (degrees), matching GeoJSON and d3-geo coordinate order.
// City centers are approximate; Santander represents the department, not a city.
// Sources: GeoNames (Santander), Mapcarta/OpenStreetMap (Uchkulan),
// and city-center gazetteer coordinates for Fort Lauderdale, Bogotá and Yalova. Çiftlikköy: https://yandex.com.tr/maps/geo/ciftlikkoy/2215903463/
export const HERITAGE_LOCATIONS = [
  { coordinates: [-80.1373, 26.1224], label: 'Fort Lauderdale', country: '840', color: '#60a5fa' },
  { coordinates: [-73.4167, 6.8333], label: 'Santander (region)', country: '170', color: '#fbbf24' },
  { coordinates: [-74.0721, 4.7110], label: 'Bogotá', country: '170', color: '#fbbf24' },
  { coordinates: [29.2769, 40.6550], label: 'Yalova', country: '792', color: '#fb923c' },
  { coordinates: [29.3228, 40.6647], label: 'Çiftlikköy', country: '792', color: '#fb923c' },
  { coordinates: [42.0962, 43.4540], label: 'Uchkulan', country: '643', color: '#34d399' },
] satisfies { coordinates: [number, number]; label: string; country: string; color: string }[];

export function isVisible(coordinates: [number, number], center: [number, number]) {
  return geoDistance(coordinates, center) < Math.PI / 2 - 0.015;
}
