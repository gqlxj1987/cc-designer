// browser_window.jsx — generic browser chrome with tab + URL bar
// Usage:
//   const { BrowserWindow } = window;
//   <BrowserWindow url="https://app.example.com/dashboard" tabTitle="Dashboard" width={1280} height={800}>
//     <YourPage />
//   </BrowserWindow>

const browserStyles = {
  outer: {
    background: '#fafaf7',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
    fontFamily: '-apple-system, system-ui, sans-serif',
    color: '#0b0b0f',
  },
  tabBar: {
    height: 36,
    display: 'flex', alignItems: 'flex-end',
    padding: '0 10px',
    background: '#e8e8e5',
    gap: 4,
  },
  tab: {
    height: 28,
    padding: '0 14px',
    background: '#fff',
    borderRadius: '8px 8px 0 0',
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 12, fontWeight: 500, color: '#0b0b0f',
    maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  urlBar: {
    height: 40,
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '0 14px',
    background: '#fff',
    borderBottom: '1px solid #e3e3e0',
  },
  controls: {
    display: 'flex', gap: 6, color: '#888',
    fontSize: 14,
  },
  url: {
    flex: 1,
    height: 28,
    background: '#f0f0ed',
    borderRadius: 999,
    padding: '0 14px',
    display: 'flex', alignItems: 'center',
    fontSize: 12, color: '#3a3a3a',
    fontVariantNumeric: 'tabular-nums',
  },
  body: {
    background: '#fff',
    overflow: 'auto',
  },
};

function BrowserWindow({ url = 'https://example.com', tabTitle = 'New Tab', width, height, children }) {
  const outerStyle = { ...browserStyles.outer, width, height };
  const bodyStyle = {
    ...browserStyles.body,
    height: height ? height - 76 : undefined,
  };
  return (
    <div style={outerStyle}>
      <div style={browserStyles.tabBar}>
        <div style={browserStyles.tab}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: '#888', display: 'inline-block' }} />
          {tabTitle}
        </div>
      </div>
      <div style={browserStyles.urlBar}>
        <div style={browserStyles.controls}>
          <span>‹</span><span>›</span><span>↻</span>
        </div>
        <div style={browserStyles.url}>{url}</div>
      </div>
      <div style={bodyStyle}>{children}</div>
    </div>
  );
}

Object.assign(window, { BrowserWindow });
