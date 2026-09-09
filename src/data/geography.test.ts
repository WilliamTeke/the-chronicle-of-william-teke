import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { geoContains, geoOrthographic } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { HERITAGE_LOCATIONS, isVisible } from './geography';

const world: Topology<{ countries: GeometryCollection }> = JSON.parse(readFileSync(new URL('../../node_modules/world-atlas/countries-50m.json', import.meta.url), 'utf8'));
const countries = feature(world, world.objects.countries);

test('heritage coordinates fall within their expected country boundaries', () => {
  for (const location of HERITAGE_LOCATIONS) {
    const country = countries.features.find(item => item.id === location.country);
    assert.ok(country, `Country data for ${location.label}`);
    assert.ok(geoContains(country, location.coordinates), `${location.label} must be in its country`);
  }
});

test('orthographic globe preserves east-west and north-south orientation', () => {
  const projection = geoOrthographic().rotate([0, 0]);
  assert.ok(projection([30, 0])![0] > projection([-30, 0])![0]);
  assert.ok(projection([0, 30])![1] < projection([0, -30])![1]);
});

test('back hemisphere markers are hidden across an entire rotation', () => {
  for (let longitude = -180; longitude < 180; longitude += 15) {
    const center: [number, number] = [longitude, 18];
    assert.equal(isVisible(center, center), true);
    assert.equal(isVisible([longitude + 180, -18], center), false);
  }
  assert.equal(isVisible([90, 0], [0, 0]), false);
});

test('nearby cities keep distinct coordinates', () => {
  const yalova = HERITAGE_LOCATIONS.find(item => item.label === 'Yalova')!;
  const ciftlikkoy = HERITAGE_LOCATIONS.find(item => item.label === 'Çiftlikköy')!;
  assert.ok(ciftlikkoy.coordinates[0] > yalova.coordinates[0]);
  assert.notDeepEqual(yalova.coordinates, ciftlikkoy.coordinates);
});
