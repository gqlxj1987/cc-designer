// animations.jsx — Stage + Sprite timeline animation primitives
// Usage in HTML:
//   <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
//   <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
//   <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
//   <script type="text/babel" src="animations.jsx"></script>
//   <script type="text/babel">
//     const { Stage, Sprite, useTime, interpolate, Easing } = window;
//     ReactDOM.createRoot(document.getElementById('root')).render(
//       <Stage width={1920} height={1080} duration={6}>
//         <Sprite start={0} end={3} enter="fade-up" exit="fade">
//           <h1 style={{fontSize: 120}}>Hello</h1>
//         </Sprite>
//       </Stage>
//     );
//   </script>

const { useState, useEffect, useRef, useMemo, useContext, createContext } = React;

const TimeContext = createContext({ t: 0, duration: 0, playing: false });

const Easing = {
  linear: (t) => t,
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeIn: (t) => t * t * t,
  spring: (t) => 1 - Math.cos((t * Math.PI) / 2),
};

function interpolate(t, [t0, t1], [v0, v1], easing = Easing.easeInOut) {
  if (t <= t0) return v0;
  if (t >= t1) return v1;
  const p = (t - t0) / (t1 - t0);
  return v0 + (v1 - v0) * easing(p);
}

function useTime() {
  return useContext(TimeContext);
}

function useSprite() {
  const ctx = useContext(SpriteContext);
  if (!ctx) throw new Error('useSprite must be inside <Sprite>');
  return ctx;
}

const SpriteContext = createContext(null);

function Stage({ width = 1920, height = 1080, duration = 6, background = '#0b0b0f', children }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const startRef = useRef(performance.now());
  const rafRef = useRef(0);

  useEffect(() => {
    function tick(now) {
      const elapsed = ((now - startRef.current) / 1000) % duration;
      setT(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    }
    if (playing) rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, duration]);

  const ctx = useMemo(() => ({ t, duration, playing }), [t, duration, playing]);

  return (
    <TimeContext.Provider value={ctx}>
      <div style={{
        position: 'fixed', inset: 0, background,
        display: 'grid', placeItems: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative', width, height,
          transformOrigin: 'center', transform: `scale(${Math.min(window.innerWidth / width, window.innerHeight / height)})`,
        }}>
          {children}
        </div>
      </div>
      <Scrubber t={t} duration={duration} playing={playing} setPlaying={setPlaying} setT={(v) => { startRef.current = performance.now() - v * 1000; setT(v); }} />
    </TimeContext.Provider>
  );
}

function Scrubber({ t, duration, playing, setPlaying, setT }) {
  return (
    <div style={{
      position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
      padding: '8px 14px', background: 'rgba(0,0,0,0.6)', color: '#fff',
      borderRadius: 999, fontSize: 12, display: 'flex', gap: 12, alignItems: 'center',
    }}>
      <button onClick={() => setPlaying(!playing)} style={{ background: 'none', color: '#fff', border: '1px solid #555', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>
        {playing ? '❚❚' : '▶'}
      </button>
      <input type="range" min={0} max={duration} step={0.01} value={t}
             onChange={(e) => setT(parseFloat(e.target.value))}
             style={{ width: 220 }} />
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {t.toFixed(2)}s / {duration.toFixed(1)}s
      </span>
    </div>
  );
}

function Sprite({ start = 0, end = Infinity, enter = 'fade', exit = 'fade', children }) {
  const { t } = useTime();
  if (t < start || t > end) return null;

  const local = t - start;
  const tail = end - t;
  const enterDur = 0.4;
  const exitDur = 0.4;

  const enterP = Math.min(1, local / enterDur);
  const exitP = Math.min(1, tail / exitDur);
  const visible = Math.min(enterP, exitP);

  const transforms = [];
  if (enter === 'fade-up') transforms.push(`translateY(${(1 - enterP) * 30}px)`);
  if (enter === 'fade-down') transforms.push(`translateY(${(1 - enterP) * -30}px)`);
  if (enter === 'fade-left') transforms.push(`translateX(${(1 - enterP) * 30}px)`);
  if (enter === 'fade-right') transforms.push(`translateX(${(1 - enterP) * -30}px)`);
  if (enter === 'scale') transforms.push(`scale(${0.92 + 0.08 * Easing.easeOut(enterP)})`);

  const ctx = { localTime: local, enterProgress: enterP, exitProgress: exitP, visible };

  return (
    <SpriteContext.Provider value={ctx}>
      <div style={{
        position: 'absolute', inset: 0,
        opacity: visible,
        transform: transforms.join(' ') || undefined,
        display: 'grid', placeItems: 'center',
      }}>
        {children}
      </div>
    </SpriteContext.Provider>
  );
}

// Expose to other JSX files
Object.assign(window, { Stage, Sprite, Scrubber, useTime, useSprite, interpolate, Easing });
