import { feature, mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import worldData from 'world-atlas/countries-50m.json';

// Share one decoding of the accurate boundaries between both map views.
const world = worldData as unknown as Topology<{ countries: GeometryCollection; land: GeometryCollection }>;
export const land = feature(world, world.objects.land);
export const countries = feature(world, world.objects.countries);
export const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
