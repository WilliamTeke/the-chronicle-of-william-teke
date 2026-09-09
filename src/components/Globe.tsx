import { useEffect, useRef, useCallback } from 'react';

const SIZE = 500;

// Simplified coastline segments [lat, lng][]
// Each sub-array is one continuous polyline (a segment of coastline).
// Breaks between arrays prevent lines from jumping across oceans.
const COASTLINES: [number, number][][] = [
  // ── North America ────────────────────────────────────────────────────────
  // Pacific coast: Alaska → Mexico
  [[71,-156],[70,-141],[60,-137],[56,-132],[55,-130],[48,-124],[46,-123],
   [42,-124],[38,-123],[35,-121],[32,-117],[29,-114],[24,-110],[22,-106],
   [19,-104],[16,-95],[15,-88]],
  // Central America → Colombia
  [[15,-88],[14,-88],[11,-83],[9,-79],[8,-77]],
  // Gulf of Mexico coast
  [[25,-98],[23,-97],[22,-96],[21,-90],[21,-87],[16,-95]],
  // East coast: Florida → Nova Scotia
  [[24,-81],[25,-80],[26,-80],[29,-81],[32,-80],[35,-76],[37,-76],
   [39,-74],[41,-72],[42,-70],[44,-67],[47,-53]],
  // Maritime Canada
  [[47,-53],[50,-56],[52,-56],[55,-61],[58,-62],[60,-64]],
  // Labrador
  [[60,-64],[63,-68],[66,-72],[68,-75]],
  // Hudson Bay (partial)
  [[63,-78],[60,-78],[60,-82],[62,-91],[63,-96],[60,-94]],
  // Gulf of Mexico north shore
  [[25,-98],[27,-97],[29,-90],[29,-89],[30,-88],[29,-85],[27,-82],[26,-80]],
  // Yucatan peninsula (simplified)
  [[21,-87],[21,-90],[18,-92],[16,-90],[16,-88],[21,-87]],
  // Greenland (simplified)
  [[76,-18],[77,-24],[77,-30],[75,-40],[72,-52],[68,-52],[63,-52],
   [61,-44],[64,-38],[70,-22],[73,-18],[76,-18]],

  // ── South America ────────────────────────────────────────────────────────
  // Pacific coast
  [[8,-77],[3,-77],[0,-80],[-3,-81],[-5,-81],[-10,-76],[-15,-75],
   [-18,-70],[-21,-70],[-27,-71],[-30,-72],[-34,-72],[-40,-73],
   [-43,-65],[-45,-66],[-54,-68],[-55,-67],[-54,-65],[-52,-58]],
  // Atlantic coast
  [[-52,-58],[-45,-65],[-40,-62],[-34,-53],[-30,-50],[-22,-41],
   [-15,-39],[-8,-35],[-5,-35],[-2,-40],[0,-50],[3,-52],[5,-52],
   [7,-58],[8,-61],[10,-62],[10,-71],[8,-77]],
  // Caribbean coast
  [[8,-77],[10,-74],[11,-73],[11,-72],[10,-62]],

  // ── Europe ───────────────────────────────────────────────────────────────
  // Atlantic: Portugal → Norway
  [[36,-9],[38,-9],[43,-9],[48,-5],[50,-5],[51,2],[53,4],[54,8],
   [55,10],[58,5],[59,5],[62,6],[63,7],[65,14],[68,16],[70,18],[71,28]],
  // Scandinavia east coast
  [[71,28],[70,20],[69,17],[65,14],[60,14],[57,12],[56,10],[55,10]],
  // Denmark / Germany coast
  [[55,10],[55,12],[57,10],[57,8],[55,8],[55,10]],
  // British Isles (England)
  [[50,-5],[51,-5],[51,-3],[53,-3],[54,-3],[54,-4],[56,-6],[58,-5],[58,0]],
  // Ireland
  [[51,-10],[53,-10],[54,-10],[55,-8],[55,-6],[53,-6],[51,-10]],
  // Iberian Peninsula south coast
  [[36,-9],[36,-6],[36,0],[40,0],[43,3]],
  // Mediterranean north coast: France → Greece
  [[43,3],[43,5],[43,7],[44,9],[44,12],[41,13],[38,16],[38,17],
   [38,20],[38,22],[37,22],[36,22],[35,24],[36,25],[37,25],[38,27],
   [39,28],[40,28],[41,29]],
  // Italy boot
  [[44,13],[43,13],[42,12],[41,13],[41,15],[40,17],[38,16]],
  // Adriatic
  [[45,14],[44,14],[43,15],[43,16],[42,17],[42,19],[41,19],[40,20],[38,22]],
  // Black Sea
  [[42,28],[43,29],[44,34],[43,38],[42,41],[43,40],[45,38],[46,32],
   [46,30],[44,33],[43,29]],
  // Baltic coast
  [[55,15],[56,16],[57,18],[58,22],[60,22],[61,21],[60,24],[59,24],
   [58,22],[57,20],[55,15]],
  // Baltic - Poland / Germany
  [[55,14],[54,14],[54,10],[55,10]],

  // ── Africa ───────────────────────────────────────────────────────────────
  // Mediterranean coast
  [[37,10],[35,10],[32,12],[30,32],[22,37],[15,42],[12,44],[11,44]],
  // East Africa / Horn
  [[11,44],[11,49],[8,48],[4,46],[2,45],[0,42],[-2,41],[-5,40],
   [-10,40],[-15,36],[-22,35]],
  // South Africa
  [[-22,35],[-28,32],[-32,29],[-34,25],[-34,20],[- 32,18],[-28,17]],
  // West Africa south
  [[-28,17],[-22,14],[-18,12],[-15,12],[-12,13],[-8,14],[-5,12],
   [-3,10],[-3,9],[0,8],[0,3],[2,2],[4,2]],
  // West Africa north (Gulf of Guinea → Senegal)
  [[4,2],[4,7],[5,3],[6,-1],[5,-5],[5,-8],[8,-13],[10,-15],[14,-17],
   [18,-17],[20,-17],[22,-17],[23,-16],[22,-10],[14,-17]],
  // North Africa (Morocco → Libya → Egypt)
  [[23,-16],[28,-13],[32,-9],[36,-6],[36,0],[37,5],[37,10],[33,12],
   [30,20],[27,25],[25,25],[22,36],[26,34],[30,32]],

  // ── Asia ─────────────────────────────────────────────────────────────────
  // Turkey / Anatolia coast
  [[41,29],[40,27],[37,27],[36,28],[36,30],[37,36],[37,42],[40,42]],
  // Caspian / Caucasus (Black Sea → Caspian)
  [[43,40],[43,48],[41,50],[37,50],[37,54],[40,54],[44,50],[44,48]],
  // Arabian Peninsula
  [[29,34],[24,38],[21,39],[15,43],[12,44],[12,48],[14,50],[18,54],
   [22,59],[24,58],[26,56],[27,57],[23,57],[22,59],[18,54]],
  // Iran / Pakistan coast
  [[25,57],[24,63],[24,67],[22,68],[20,73]],
  // India
  [[20,73],[18,73],[16,74],[12,77],[8,78],[7,80],[8,80],[10,80],
   [14,80],[18,84],[22,88],[23,89],[23,92],[24,91],[26,92],[27,95]],
  // Myanmar / Thailand coast
  [[27,95],[24,93],[22,92],[18,95],[14,98],[10,99],[5,100],[1,104],
   [-2,106],[-3,105],[-5,106],[-7,107],[-8,115],[-8,117]],
  // Vietnam / South China coast
  [[10,104],[10,107],[12,109],[14,108],[16,107],[17,106],[20,107],
   [22,113],[23,114],[23,116],[24,118],[25,120],[26,120],[28,121],
   [30,122],[32,121],[34,119],[36,120],[38,121],[39,122],[40,122]],
  // Korean Peninsula
  [[40,122],[38,120],[37,120],[35,126],[34,129],[35,129],[37,129],
   [38,128],[38,126],[37,126],[35,126]],
  // Japan (Honshu)
  [[33,131],[34,132],[34,136],[35,137],[36,137],[38,140],[39,141],
   [40,141],[41,141],[42,140],[42,139],[40,136],[37,137],[35,137],
   [34,135],[33,132],[33,131]],
  // Japan (Kyushu)
  [[33,131],[32,130],[32,131],[33,132],[33,131]],
  // Taiwan
  [[25,121],[25,122],[23,121],[22,120],[23,120],[25,121]],
  // Malay Peninsula
  [[5,100],[4,103],[1,104],[1,103],[3,101],[5,100]],
  // Borneo (north coast)
  [[-1,109],[2,109],[4,113],[6,117],[6,116],[4,113],[1,110],[-1,109]],
  // Philippines (Luzon)
  [[14,120],[16,120],[18,122],[18,120],[16,118],[14,121],[14,120]],
  // Sri Lanka
  [[6,80],[8,81],[10,80],[8,80],[6,80]],
  // Persian Gulf
  [[23,57],[24,51],[26,50],[28,48],[29,48],[29,50],[27,49],[24,51]],
  // Red Sea
  [[12,44],[15,42],[22,37],[27,34],[29,34],[27,34],[22,37],[15,43],[12,44]],
  // Indonesia (Java, simplified)
  [[-6,106],[-7,108],[-8,112],[-8,115],[- 7,112],[-6,106]],
  // Sumatra (west coast)
  [[5,96],[2,99],[0,99],[-3,101],[-5,104],[-5,106]],
  // Cambodia / Vietnam south
  [[10,104],[11,105],[13,107],[11,109],[10,107],[10,104]],

  // ── Australia ────────────────────────────────────────────────────────────
  // North coast
  [[-14,126],[-14,130],[-12,136],[-12,141],[-14,145],[-15,145],
   [-20,148],[-23,150],[-28,153],[-32,153],[-34,151],[-36,150],
   [-38,147],[-38,145],[-37,149]],
  // East coast
  [[-38,145],[-39,143],[-38,142],[-36,141],[-32,134],[-32,130],
   [-34,122],[-35,117]],
  // South + west coast
  [[-35,117],[-32,115],[-25,114],[-22,114],[-16,123],[-14,126]],
  // Tasmania
  [[-41,145],[-43,146],[-44,148],[-43,147],[-41,145]],

  // ── New Zealand ──────────────────────────────────────────────────────────
  [[-34,173],[-36,175],[-37,176],[-39,177],[-40,176],[-41,174],
   [-40,172],[-42,172],[-44,170],[-46,168],[-44,172],[-41,174],[-34,173]],
];

interface HeritageLocation {
  lat: number;
  lng: number;
  label: string;
  color: string;
  ldx: number;
  ldy: number;
}

// Label stacking strategy:
//   Each label block is ~23px tall (11px bold + 9px sublabel + baseline gap).
//   Close pairs (Yalova/Bursa ~2px apart; Santander/Bogotá ~8px apart) are stacked
//   vertically on the same side: the higher-latitude city gets ldy < 0 (floats above),
//   the lower-latitude city gets ldy > 0 (drops below). Offsets are the minimum needed
//   to leave a ~15px clear gap between the two text blocks.
const HERITAGE: HeritageLocation[] = [
  { lat: 26.12, lng: -80.14, label: 'Fort Lauderdale', color: '#60a5fa', ldx: 14, ldy:  -4 },
  { lat: 6.64,  lng: -73.00, label: 'Santander',       color: '#fbbf24', ldx: 13, ldy: -18 },
  { lat: 4.71,  lng: -74.07, label: 'Bogotá',          color: '#fbbf24', ldx: 13, ldy:   8 },
  { lat: 40.65, lng: 29.27,  label: 'Yalova',          color: '#fb923c', ldx: 13, ldy: -18 },
  { lat: 40.19, lng: 29.06,  label: 'Bursa',           color: '#fb923c', ldx: 13, ldy:   8 },
  { lat: 43.58, lng: 41.83,  label: 'Uchkulan',        color: '#34d399', ldx: 14, ldy:  -4 },
];

function project(lat: number, lng: number, rotDeg: number) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + rotDeg) * (Math.PI / 180);
  return {
    x:  Math.sin(phi) * Math.cos(theta),
    y:  Math.cos(phi),
    z:  Math.sin(phi) * Math.sin(theta),
  };
}

export default function Globe() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rotRef     = useRef(20);
  const rafRef     = useRef<number>(0);
  const readyRef   = useRef(false);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !readyRef.current) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    rotRef.current += 0.12;
    const rot = rotRef.current;
    const cx  = SIZE / 2;
    const cy  = SIZE / 2;
    const r   = SIZE * 0.42;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // ── Atmosphere ───────────────────────────────────────────────────────
    const atmos = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.28);
    atmos.addColorStop(0, 'rgba(56,189,248,0.14)');
    atmos.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.28, 0, Math.PI * 2);
    ctx.fillStyle = atmos;
    ctx.fill();

    // ── Sphere base ──────────────────────────────────────────────────────
    const sg = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.30, r * 0.02, cx, cy, r);
    sg.addColorStop(0,   '#1e3a5c');
    sg.addColorStop(0.6, '#0c1e32');
    sg.addColorStop(1,   '#020a14');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = sg;
    ctx.fill();

    // ── Clip to sphere ───────────────────────────────────────────────────
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
    ctx.clip();

    // Grid lines
    ctx.lineWidth   = 0.5;
    ctx.strokeStyle = 'rgba(56,189,248,0.06)';
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lng = -180; lng <= 180; lng += 4) {
        const p = project(lat, lng, rot);
        if (p.z <= 0) { first = true; continue; }
        const sx = cx + p.x * r, sy = cy - p.y * r;
        first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        first = false;
      }
      ctx.stroke();
    }
    for (let lng = 0; lng < 360; lng += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 4) {
        const p = project(lat, lng, rot);
        if (p.z <= 0) { first = true; continue; }
        const sx = cx + p.x * r, sy = cy - p.y * r;
        first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        first = false;
      }
      ctx.stroke();
    }

    // ── Coastlines ───────────────────────────────────────────────────────
    // Two passes: faint filled land, then bright outline
    for (const segment of COASTLINES) {
      ctx.beginPath();
      let penDown = false;
      let prevZ   = 0;

      for (const [lat, lng] of segment) {
        const p  = project(lat, lng, rot);
        const sx = cx + p.x * r;
        const sy = cy - p.y * r;

        if (p.z <= 0) {
          penDown = false;
          prevZ   = p.z;
          continue;
        }

        // Lift pen when transitioning from behind the sphere
        if (!penDown || prevZ <= 0) {
          ctx.moveTo(sx, sy);
          penDown = true;
        } else {
          ctx.lineTo(sx, sy);
        }
        prevZ = p.z;
      }

      // Stroke: bright cyan-blue coastal line
      ctx.strokeStyle = 'rgba(120,210,255,0.55)';
      ctx.lineWidth   = 1.2;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      ctx.stroke();
    }

    ctx.restore();

    // ── Heritage markers ─────────────────────────────────────────────────
    const pulse = (Math.sin(ts * 0.002) + 1) / 2;

    for (const loc of HERITAGE) {
      const p     = project(loc.lat, loc.lng, rot);
      if (p.z < -0.2) continue;
      const sx    = cx + p.x * r;
      const sy    = cy - p.y * r;
      const alpha = Math.max(0, Math.min(1, (p.z + 0.3) / 0.7));

      // Pulse ring
      const pr = 7 + pulse * 10;
      const pg = ctx.createRadialGradient(sx, sy, 0, sx, sy, pr);
      pg.addColorStop(0, loc.color + '99');
      pg.addColorStop(1, loc.color + '00');
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(sx, sy, pr, 0, Math.PI * 2);
      ctx.fillStyle = pg;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = loc.color;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Labels (only when facing front)
      if (p.z > 0.25) {
        const la = alpha * Math.min(1, (p.z - 0.25) / 0.3);
        ctx.globalAlpha = la;

        const lx = sx + loc.ldx;
        const ly = sy + loc.ldy;

        // Short leader line from dot edge to label baseline
        ctx.beginPath();
        ctx.moveTo(sx + 6, sy);
        ctx.lineTo(lx, ly + 3);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth   = 0.6;
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#f5f5f7';
        ctx.font      = 'bold 11px -apple-system, system-ui, sans-serif';
        ctx.fillText(loc.label, lx, ly);
        ctx.globalAlpha = 1;
      }
    }

    // ── Specular highlight ───────────────────────────────────────────────
    const spec = ctx.createRadialGradient(
      cx - r * 0.32, cy - r * 0.38, 0,
      cx - r * 0.10, cy - r * 0.10, r * 0.62,
    );
    spec.addColorStop(0, 'rgba(255,255,255,0.06)');
    spec.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = spec;
    ctx.fill();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr     = window.devicePixelRatio || 1;
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    readyRef.current = true;
    rafRef.current   = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      readyRef.current = false;
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `min(${SIZE}px, 100%)`, aspectRatio: '1 / 1', display: 'block' }}
    />
  );
}
