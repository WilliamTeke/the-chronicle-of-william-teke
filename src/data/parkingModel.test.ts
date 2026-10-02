import { test } from 'node:test';
import assert from 'node:assert/strict';
import { simulateParking } from './parkingModel';
test('empty demand produces no parked or unserved vehicles', () => {
  assert.ok(simulateParking(0,140).every(s => s.parked === 0 && s.arrivals === 0));
});
test('arrivals are conserved and general parking never exceeds capacity', () => {
  for (const bays of [0,2,3]) for (const s of simulateParking(120,140,bays)) {
    assert.equal(s.admitted+s.unserved,s.arrivals);
    assert.ok(s.parked <= 160-bays);
    assert.ok(s.parked <= s.admitted);
  }
});
test('identical assumptions produce identical outcomes', () => {
  assert.deepEqual(simulateParking(90,140,0),simulateParking(90,140,0));
});
test('shorter stays free capacity under sustained high demand', () => {
  const before=simulateParking(120,140).at(-1)!;
  const after=simulateParking(120,90).at(-1)!;
  assert.ok(after.admitted>before.admitted);
  assert.ok(after.unserved<before.unserved);
});
test('reserved bays cannot increase general capacity without a behavior change', () => {
  const before=simulateParking(120,140,0).at(-1)!;
  const after=simulateParking(120,140,2).at(-1)!;
  assert.ok(after.admitted<=before.admitted);
});
test('invalid assumptions are rejected', () => {
  for(const args of [[-1,140,0],[90,0,0],[90,140,160],[90,140,1.5]]) assert.throws(()=>simulateParking(...args as [number,number,number]));
});
