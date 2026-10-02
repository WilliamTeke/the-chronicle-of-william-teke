/** Deterministic thought experiment, not a fitted model or historical reconstruction. */
export const PARKING_CAPACITY = 160;
export const SCENARIO_MINUTES = 240;
export interface ParkingSnapshot { minute: number; slots: boolean[]; parked: number; admitted: number; unserved: number; arrivals: number }
export function simulateParking(arrivalsPerHour: number, stayMinutes: number, reservedBays = 0): ParkingSnapshot[] {
  if (!Number.isFinite(arrivalsPerHour) || arrivalsPerHour < 0 || !Number.isFinite(stayMinutes) || stayMinutes <= 0 || !Number.isInteger(reservedBays) || reservedBays < 0 || reservedBays >= PARKING_CAPACITY) throw new Error('Invalid parking assumptions');
  const departure = Array(PARKING_CAPACITY - reservedBays).fill(0);
  let admitted = 0, unserved = 0, previousArrivals = 0;
  return Array.from({ length: SCENARIO_MINUTES + 1 }, (_, minute) => {
    const arrivals = Math.floor(minute * arrivalsPerHour / 60);
    for (let i = previousArrivals; i < arrivals; i++) {
      const slot = departure.findIndex(time => time <= minute);
      if (slot < 0) unserved++;
      else { departure[slot] = minute + stayMinutes; admitted++; }
    }
    previousArrivals = arrivals;
    const slots = departure.map(time => time > minute);
    return { minute, slots, parked: slots.filter(Boolean).length, admitted, unserved, arrivals };
  });
}
