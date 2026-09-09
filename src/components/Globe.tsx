import { useEffect, useRef, useState } from 'react';
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import worldData from 'world-atlas/countries-50m.json';
import { HERITAGE_LOCATIONS, isVisible } from '../data/geography';

// Natural Earth 1:50m boundaries, redistributed by world-atlas (public domain).
// One projection clips the land, country borders, and markers to the same hemisphere.
const world = worldData as unknown as Topology<{ countries: GeometryCollection; land: GeometryCollection }>;
const land = feature(world, world.objects.land);
const countries = feature(world, world.objects.countries);
const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
const graticule = geoGraticule10();
const SIZE = 500;
const RADIUS = 204;

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(20);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr; canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const projection = geoOrthographic().translate([250, 250]).scale(RADIUS).clipAngle(90).precision(0.4);
    const path = geoPath(projection, ctx);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastTime = 0;
    let visible = true;

    const draw = () => {
      const center: [number, number] = [-rotationRef.current, 18];
      projection.rotate([rotationRef.current, -18, 0]);
      ctx.clearRect(0, 0, SIZE, SIZE);
      const glow = ctx.createRadialGradient(250, 250, RADIUS * .9, 250, 250, 248);
      glow.addColorStop(0, '#38bdf819'); glow.addColorStop(1, '#38bdf800');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = '#081723'; ctx.fill();
      ctx.beginPath(); path(graticule); ctx.strokeStyle = '#789eac20'; ctx.lineWidth = .6; ctx.stroke();
      ctx.beginPath(); path(land); ctx.fillStyle = '#203e4e'; ctx.fill();
      // Tint heritage countries while preserving their real geographic outlines.
      for (const country of countries.features) {
        const location = HERITAGE_LOCATIONS.find(loc => loc.country === country.id);
        if (!location) continue;
        ctx.beginPath(); path(country); ctx.fillStyle = location.color + '24'; ctx.fill();
      }
      ctx.beginPath(); path(land); ctx.strokeStyle = '#8fc9df99'; ctx.lineWidth = .75; ctx.stroke();
      ctx.beginPath(); path(borders); ctx.strokeStyle = '#98c5d576'; ctx.lineWidth = .5; ctx.stroke();
      ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = '#88bfd74d'; ctx.lineWidth = 1; ctx.stroke();

      const markers = HERITAGE_LOCATIONS.filter(loc => isVisible(loc.coordinates, center)).map(loc => {
        const [x, y] = projection(loc.coordinates)!;
        return { ...loc, x, y };
      });
      // Move labels, never map coordinates. Leader lines retain the true positions.
      for (const side of [-1, 1]) {
        const group = markers.filter(m => (m.x < 250 ? -1 : 1) === side).sort((a, b) => a.y - b.y);
        let previousY = 26;
        for (const marker of group) {
          const labelY = Math.max(marker.y, previousY + 21);
          previousY = labelY;
          ctx.font = '12px Inter, system-ui, sans-serif';
          const textWidth = ctx.measureText(marker.label).width;
          const labelX = side === -1 ? Math.max(textWidth + 10, marker.x - 20) : Math.min(SIZE - textWidth - 10, marker.x + 20);
          ctx.beginPath(); ctx.moveTo(marker.x, marker.y); ctx.lineTo(labelX, labelY);
          ctx.strokeStyle = '#e1eef580'; ctx.lineWidth = .7; ctx.stroke();
          ctx.textAlign = side === -1 ? 'right' : 'left'; ctx.textBaseline = 'middle';
          ctx.lineWidth = 4; ctx.strokeStyle = '#081723'; ctx.strokeText(marker.label, labelX, labelY);
          ctx.fillStyle = '#f5f5f7'; ctx.fillText(marker.label, labelX, labelY);
        }
      }
      for (const marker of markers) {
        ctx.beginPath(); ctx.arc(marker.x, marker.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = marker.color + '35'; ctx.fill();
        ctx.beginPath(); ctx.arc(marker.x, marker.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = marker.color; ctx.fill();
      }
    };
    const tick = (time: number) => {
      if (paused || reducedMotion.matches || !visible || document.hidden) return;
      if (!lastTime || time - lastTime >= 40) {
        if (lastTime) rotationRef.current = (rotationRef.current + Math.min(time - lastTime, 100) * .004) % 360;
        lastTime = time; draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const resume = () => { cancelAnimationFrame(frame); lastTime = 0; draw(); frame = requestAnimationFrame(tick); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', resume);
    reducedMotion.addEventListener('change', resume);
    resume();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      document.removeEventListener('visibilitychange', resume);
      reducedMotion.removeEventListener('change', resume);
    };
  }, [paused]);

  return <div style={{ width: '100%', maxWidth: SIZE }}>
    <canvas ref={canvasRef} role="img" aria-label="Geographic globe showing country boundaries and heritage locations in Fort Lauderdale, Santander department, Bogotá, Yalova, Bursa, and Uchkulan." style={{ width: '100%', aspectRatio: '1 / 1', display: 'block' }} />
    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center', fontSize: 12, color: '#a9bdc8' }}>
      <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} style={{ cursor: 'pointer', border: '1px solid #ffffff30', borderRadius: 20, padding: '6px 12px', background: 'transparent', color: 'inherit' }}>{paused ? 'Resume rotation' : 'Pause rotation'}</button>
      <a href="https://www.naturalearthdata.com/about/" target="_blank" rel="noreferrer">Map: Natural Earth ↗</a>
    </div>
  </div>;
}
