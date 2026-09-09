import { useEffect, useRef, useState } from "react";

/** A procedural galaxy: no video downloads or external image requests. */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let phase = 0;
    let lastTime = 0;
    let visible = true;
    let seed = 42;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const stars = Array.from({ length: 2200 }, (_, i) => {
      const radius = Math.pow(random(), 0.65);
      const angle = radius * 7 + (i % 3) * Math.PI * 2 / 3 + (random() - 0.5) * 1.7;
      return { radius, angle, z: (random() - 0.5) * 0.36, size: random(), flicker: random() * Math.PI * 2, warm: random() > 0.8 };
    });
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width * 0.52, height * 0.8);
      for (const star of stars) {
        const angle = star.angle + phase;
        const x0 = Math.cos(angle) * star.radius;
        const y0 = Math.sin(angle) * star.radius * 0.57 + star.z;
        const tilt = -0.52;
        const x = width / 2 + (x0 * Math.cos(tilt) - y0 * Math.sin(tilt)) * scale;
        const y = height * 0.49 + (x0 * Math.sin(tilt) + y0 * Math.cos(tilt)) * scale;
        const size = star.size > 0.976 ? 2.1 : star.size > 0.89 ? 1.15 : 0.45;
        const alpha = 0.22 + star.size * 0.64 + Math.sin(phase * 12 + star.flicker) * 0.08;
        if (size > 1) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 7);
          glow.addColorStop(0, `rgba(${star.warm ? "247,204,172" : "191,222,243"},${alpha * 0.45})`);
          glow.addColorStop(1, "rgba(160,200,240,0)");
          ctx.fillStyle = glow;
          ctx.fillRect(x - size * 7, y - size * 7, size * 14, size * 14);
        }
        ctx.fillStyle = `rgba(${star.warm ? "255,219,188" : "229,243,255"},${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
      }
    };
    const tick = (time: number) => {
      frame = 0;
      if (paused || reducedMotion.matches || !visible || document.hidden) return;
      // The slow background motion needs at most 30 draws per second.
      if (!lastTime || time - lastTime >= 1000 / 30) {
        if (lastTime) phase += Math.min(time - lastTime, 100) * 0.000012;
        lastTime = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      cancelAnimationFrame(frame); lastTime = 0;
      if (visible && !document.hidden) { draw(); frame = requestAnimationFrame(tick); }
    };
    const resize = new ResizeObserver(() => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    });
    resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    intersection.observe(canvas);
    reducedMotion.addEventListener("change", resume);
    document.addEventListener("visibilitychange", resume);
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect();
      reducedMotion.removeEventListener("change", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [paused]);

  return <>
    <canvas ref={canvasRef} className="star-field" aria-hidden="true" />
    <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? "Play star animation" : "Pause star animation"} aria-pressed={paused}>{paused ? "▷" : "Ⅱ"}</button>
  </>;
}
