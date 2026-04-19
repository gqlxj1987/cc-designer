// design_canvas.jsx — DesignCanvas + Cell for laying out 2+ static design options side-by-side
// Usage:
//   <script type="text/babel" src="design_canvas.jsx"></script>
//   <script type="text/babel">
//     const { DesignCanvas, Cell } = window;
//     ReactDOM.createRoot(document.getElementById('root')).render(
//       <DesignCanvas>
//         <Cell label="A — split">{/* design 1 */}</Cell>
//         <Cell label="B — stacked">{/* design 2 */}</Cell>
//         <Cell label="C — centered">{/* design 3 */}</Cell>
//       </DesignCanvas>
//     );
//   </script>

const canvasStyles = {
  root: {
    minHeight: '100vh',
    padding: '40px',
    background: '#f8f8f5',
    fontFamily: 'system-ui, sans-serif',
    color: '#0b0b0f',
  },
  header: {
    marginBottom: 24,
    fontSize: 14,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: 24,
  },
  cell: {
    background: '#fff',
    border: '1px solid #e3e3e0',
    borderRadius: 12,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  cellLabel: {
    padding: '10px 16px',
    borderBottom: '1px solid #e3e3e0',
    fontSize: 13,
    fontWeight: 600,
    color: '#0b0b0f',
    background: '#fafaf7',
  },
  cellBody: {
    flex: 1,
    aspectRatio: '16 / 10',
    overflow: 'hidden',
    position: 'relative',
  },
  cellMeta: {
    padding: '10px 16px',
    borderTop: '1px solid #e3e3e0',
    fontSize: 12,
    color: '#777',
  },
};

function DesignCanvas({ title, children }) {
  return (
    <div style={canvasStyles.root}>
      {title && <div style={canvasStyles.header}>{title}</div>}
      <div style={canvasStyles.grid}>{children}</div>
    </div>
  );
}

function Cell({ label, meta, children }) {
  return (
    <div style={canvasStyles.cell}>
      {label && <div style={canvasStyles.cellLabel}>{label}</div>}
      <div style={canvasStyles.cellBody}>{children}</div>
      {meta && <div style={canvasStyles.cellMeta}>{meta}</div>}
    </div>
  );
}

Object.assign(window, { DesignCanvas, Cell });
