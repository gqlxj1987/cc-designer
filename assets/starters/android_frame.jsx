// android_frame.jsx — Android (Pixel-style) device frame with status bar + nav bar
// Usage:
//   const { AndroidFrame } = window;
//   <AndroidFrame statusBarTime="9:41">
//     <YourScreen />
//   </AndroidFrame>

const androidStyles = {
  outer: {
    width: 412,
    height: 892,
    background: '#1c1c22',
    borderRadius: 44,
    padding: 10,
    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.45), 0 0 0 1.5px #2b2b32 inset',
  },
  screen: {
    width: '100%', height: '100%',
    borderRadius: 36,
    overflow: 'hidden',
    background: '#fff',
    position: 'relative',
    color: '#0b0b0f',
  },
  statusBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 32,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 18px',
    fontSize: 13, fontWeight: 500,
    fontFamily: 'Roboto, system-ui, sans-serif',
    color: 'inherit', zIndex: 10, pointerEvents: 'none',
  },
  punchHole: {
    position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
    width: 16, height: 16, borderRadius: '50%',
    background: '#0b0b0f', zIndex: 20,
  },
  navBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 36,
    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    background: 'currentColor', opacity: 0.04, zIndex: 10,
  },
  navHandle: {
    position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
    width: 110, height: 4, borderRadius: 2, background: 'currentColor', opacity: 0.4,
  },
  body: {
    position: 'absolute', top: 32, bottom: 36, left: 0, right: 0,
    overflow: 'auto',
  },
};

function AndroidFrame({ statusBarTime = '9:41', dark = false, children }) {
  const screenStyle = {
    ...androidStyles.screen,
    background: dark ? '#0b0b0f' : '#fff',
    color: dark ? '#fff' : '#0b0b0f',
  };
  return (
    <div style={androidStyles.outer}>
      <div style={screenStyle}>
        <div style={androidStyles.statusBar}>
          <span>{statusBarTime}</span>
          <span style={{ display: 'flex', gap: 6, fontSize: 12 }}>
            <span>●●●●</span>
            <span>◧</span>
            <span>100%</span>
          </span>
        </div>
        <div style={androidStyles.punchHole} />
        <div style={androidStyles.body}>{children}</div>
        <div style={androidStyles.navHandle} />
      </div>
    </div>
  );
}

Object.assign(window, { AndroidFrame });
