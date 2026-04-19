// macos_window.jsx — macOS-style window chrome with traffic lights + title bar
// Usage:
//   const { MacOSWindow } = window;
//   <MacOSWindow title="Figma — onboarding-v3" width={1280} height={800}>
//     <YourAppContent />
//   </MacOSWindow>

const macosStyles = {
  outer: {
    background: '#fafaf7',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
    fontFamily: '-apple-system, system-ui, sans-serif',
    color: '#0b0b0f',
  },
  titleBar: {
    height: 38,
    display: 'flex', alignItems: 'center',
    padding: '0 14px',
    background: 'linear-gradient(to bottom, #ececeb, #e0e0dd)',
    borderBottom: '1px solid #d0d0cc',
    position: 'relative',
  },
  lights: {
    display: 'flex', gap: 8, alignItems: 'center',
  },
  light: (color) => ({
    width: 12, height: 12, borderRadius: '50%', background: color,
    boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)',
  }),
  title: {
    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
    fontSize: 13, fontWeight: 500, color: '#3a3a3a',
    pointerEvents: 'none',
  },
  body: {
    background: '#fff',
    overflow: 'auto',
  },
};

function MacOSWindow({ title = 'Untitled', width, height, dark = false, children }) {
  const outerStyle = {
    ...macosStyles.outer,
    width, height,
    background: dark ? '#1c1c22' : macosStyles.outer.background,
    color: dark ? '#fff' : '#0b0b0f',
  };
  const titleBarStyle = {
    ...macosStyles.titleBar,
    background: dark ? '#2a2a32' : macosStyles.titleBar.background,
    borderBottom: dark ? '1px solid #1c1c22' : macosStyles.titleBar.borderBottom,
  };
  const titleStyle = {
    ...macosStyles.title,
    color: dark ? '#bbb' : '#3a3a3a',
  };
  const bodyStyle = {
    ...macosStyles.body,
    background: dark ? '#0b0b0f' : '#fff',
    height: height ? height - 38 : undefined,
  };
  return (
    <div style={outerStyle}>
      <div style={titleBarStyle}>
        <div style={macosStyles.lights}>
          <div style={macosStyles.light('#ff5f57')} />
          <div style={macosStyles.light('#febc2e')} />
          <div style={macosStyles.light('#28c840')} />
        </div>
        <div style={titleStyle}>{title}</div>
      </div>
      <div style={bodyStyle}>{children}</div>
    </div>
  );
}

Object.assign(window, { MacOSWindow });
