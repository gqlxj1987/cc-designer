// ios_frame.jsx — iPhone 15 Pro–style device frame with Dynamic Island + status bar + home indicator
// Usage:
//   const { IOSFrame } = window;
//   <IOSFrame statusBarTime="9:41" carrier="Wi-Fi">
//     <YourScreen />
//   </IOSFrame>

const iosStyles = {
  outer: {
    width: 393,
    height: 852,
    background: '#0b0b0f',
    borderRadius: 56,
    padding: 12,
    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.45), 0 0 0 1.5px #1c1c22 inset',
    position: 'relative',
  },
  screen: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
    overflow: 'hidden',
    background: '#fff',
    position: 'relative',
    color: '#0b0b0f',
  },
  statusBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 54,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 28px',
    fontSize: 16, fontWeight: 600,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: 'inherit',
    zIndex: 10,
    pointerEvents: 'none',
  },
  island: {
    position: 'absolute',
    top: 12, left: '50%', transform: 'translateX(-50%)',
    width: 124, height: 36, borderRadius: 999,
    background: '#0b0b0f', zIndex: 20,
  },
  homeBar: {
    position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
    width: 134, height: 5, borderRadius: 3, background: 'currentColor',
    opacity: 0.35, zIndex: 10,
  },
  body: {
    position: 'absolute', top: 54, bottom: 34, left: 0, right: 0,
    overflow: 'auto',
  },
};

function IOSFrame({ statusBarTime = '9:41', carrier = '5G', dark = false, children }) {
  const screenStyle = {
    ...iosStyles.screen,
    background: dark ? '#0b0b0f' : '#fff',
    color: dark ? '#fff' : '#0b0b0f',
  };
  return (
    <div style={iosStyles.outer}>
      <div style={screenStyle}>
        <div style={iosStyles.statusBar}>
          <span>{statusBarTime}</span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
            <span>{carrier}</span>
            <span>􀛨</span>
            <span>􀛪</span>
          </span>
        </div>
        <div style={iosStyles.island} />
        <div style={iosStyles.body}>{children}</div>
        <div style={iosStyles.homeBar} />
      </div>
    </div>
  );
}

Object.assign(window, { IOSFrame });
