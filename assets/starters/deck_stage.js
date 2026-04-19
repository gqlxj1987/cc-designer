// deck_stage.js — vanilla web component for slide decks
// Usage:
//   <deck-stage>
//     <section><h1>Slide 1</h1></section>
//     <section><h1>Slide 2</h1></section>
//   </deck-stage>
//
// Handles: 1920x1080 design space + scale-to-fit, keyboard nav (arrow keys / space),
// localStorage current-slide persistence, print mode (one slide per page),
// auto-applied data-screen-label (1-indexed), postMessage slideIndexChanged sync.

(function () {
  const DESIGN_W = 1920;
  const DESIGN_H = 1080;
  const STORAGE_KEY = 'deck-stage:slide';

  class DeckStage extends HTMLElement {
    constructor() {
      super();
      this._idx = 0;
      this._scale = 1;
    }

    connectedCallback() {
      this._mount();
      this._labelSlides();
      this._restore();
      this._render();
      this._bind();
      this._fit();
    }

    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('beforeprint', this._onPrint);
      window.removeEventListener('afterprint', this._onPrintEnd);
    }

    _mount() {
      this.style.display = 'block';
      this.style.position = 'fixed';
      this.style.inset = '0';
      this.style.background = 'var(--deck-bg, #0b0b0f)';
      this.style.overflow = 'hidden';

      const stage = document.createElement('div');
      stage.className = 'deck-stage__viewport';
      stage.style.cssText = `
        position: absolute;
        top: 50%; left: 50%;
        width: ${DESIGN_W}px; height: ${DESIGN_H}px;
        transform-origin: top left;
      `;
      while (this.firstChild) stage.appendChild(this.firstChild);
      this._stage = stage;
      this.appendChild(stage);

      const ui = document.createElement('div');
      ui.className = 'deck-stage__ui';
      ui.style.cssText = `
        position: fixed; bottom: 16px; left: 50%;
        transform: translateX(-50%);
        padding: 6px 14px; border-radius: 999px;
        background: rgba(0,0,0,0.55); color: #fff;
        font: 12px/1.2 system-ui, sans-serif; letter-spacing: 0.04em;
        user-select: none; pointer-events: none;
      `;
      this._ui = ui;
      this.appendChild(ui);
    }

    _labelSlides() {
      this._slides = Array.from(this._stage.children).filter(
        (el) => el.tagName.toLowerCase() === 'section'
      );
      this._slides.forEach((s, i) => {
        s.dataset.screenLabel = String(i + 1);
        s.style.position = 'absolute';
        s.style.inset = '0';
        s.style.display = 'none';
      });
    }

    _restore() {
      const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      if (!Number.isNaN(stored) && stored >= 0 && stored < this._slides.length) {
        this._idx = stored;
      }
    }

    _render() {
      this._slides.forEach((s, i) => {
        s.style.display = i === this._idx ? 'block' : 'none';
      });
      this._ui.textContent = `${this._idx + 1} / ${this._slides.length}`;
      try {
        localStorage.setItem(STORAGE_KEY, String(this._idx));
      } catch (e) { /* private mode */ }
      window.postMessage({ type: 'slideIndexChanged', slideIndex: this._idx }, '*');
    }

    _bind() {
      this._onResize = () => this._fit();
      this._onKey = (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          this.next(); e.preventDefault();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          this.prev(); e.preventDefault();
        } else if (e.key === 'Home') {
          this.go(0);
        } else if (e.key === 'End') {
          this.go(this._slides.length - 1);
        } else if (e.key === 'p' || e.key === 'P') {
          window.print();
        }
      };
      this._onPrint = () => {
        this._slides.forEach((s) => { s.style.display = 'block'; s.style.position = 'relative'; });
        this._stage.style.transform = 'none';
        this._ui.style.display = 'none';
      };
      this._onPrintEnd = () => {
        this._labelSlides();
        this._render();
        this._fit();
        this._ui.style.display = '';
      };

      window.addEventListener('resize', this._onResize);
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('beforeprint', this._onPrint);
      window.addEventListener('afterprint', this._onPrintEnd);
    }

    _fit() {
      const sx = window.innerWidth / DESIGN_W;
      const sy = window.innerHeight / DESIGN_H;
      const s = Math.min(sx, sy);
      this._scale = s;
      this._stage.style.transform =
        `translate(-50%, -50%) scale(${s})`;
      this._stage.style.left = '50%';
      this._stage.style.top = '50%';
      this._stage.style.transformOrigin = 'center center';
    }

    next() { this.go(this._idx + 1); }
    prev() { this.go(this._idx - 1); }
    go(i) {
      if (i < 0 || i >= this._slides.length) return;
      this._idx = i;
      this._render();
    }
  }

  customElements.define('deck-stage', DeckStage);

  // Print CSS — show every slide on its own page
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      @page { size: 1920px 1080px; margin: 0; }
      body { margin: 0; background: white; }
      deck-stage { position: relative !important; height: auto !important; }
      deck-stage section { page-break-after: always; }
    }
  `;
  document.head.appendChild(style);
})();
