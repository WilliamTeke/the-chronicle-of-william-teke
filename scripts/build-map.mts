import { HERITAGE_LOCATIONS } from '../src/data/geography.ts';
import { readFileSync, writeFileSync } from 'node:fs';
import { presimplify, simplify, quantile } from 'topojson-simplify';
import { quantize, feature } from 'topojson-client';
import { geoContains } from 'd3-geo';
import type { Topology, GeometryCollection } from 'topojson-specification';

const source = JSON.parse(readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
// Simplify shared arcs once so neighboring countries retain matching boundaries.
const weighted = presimplify(source);
const result = quantize(simplify(weighted, quantile(weighted, 0.2)), 100000) as Topology<{countries: GeometryCollection}>;
const countries = feature(result, result.objects.countries);
for (const location of HERITAGE_LOCATIONS) {
  if (!geoContains(countries.features.find(c => c.id === location.country)!, location.coordinates)) throw Error(`Simplification lost ${location.label}`);
}
writeFileSync('src/data/world.compact.json',JSON.stringify(result));
console.log(`Map source: ${JSON.stringify(source).length} bytes → ${JSON.stringify(result).length} bytes`);
