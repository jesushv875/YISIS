// Run: node generate-assets.js
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// ── CRC32 ──────────────────────────────────────────────────────────────────
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const tb = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(Buffer.concat([tb, data])));
  return Buffer.concat([len, tb, data, crcBuf]);
}

// ── PNG builder ────────────────────────────────────────────────────────────
function buildPNG(w, h, getPixel) {
  const sig = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // RGBA

  const rowBytes = 1 + w * 4;
  const raw = Buffer.alloc(h * rowBytes);
  for (let y = 0; y < h; y++) {
    raw[y * rowBytes] = 0; // filter: None
    for (let x = 0; x < w; x++) {
      const [r, g, b, a] = getPixel(x, y, w, h);
      const i = y * rowBytes + 1 + x * 4;
      raw[i] = r; raw[i+1] = g; raw[i+2] = b; raw[i+3] = a;
    }
  }
  const idat = zlib.deflateSync(raw, { level: 3 });
  return Buffer.concat([sig, makeChunk('IHDR', ihdr), makeChunk('IDAT', idat), makeChunk('IEND', Buffer.alloc(0))]);
}

// ── Math helpers ───────────────────────────────────────────────────────────
function lerp(a, b, t) { return Math.round(a + (b - a) * Math.max(0, Math.min(1, t))); }

// Heart implicit: (x²+y²-1)³ - x²y³ ≤ 0  (math coords: y up)
function heartVal(x, y) {
  const x2 = x*x, y2 = y*y;
  const t = x2 + y2 - 1;
  return t*t*t - x2*y2*y;
}

// SSAA 4 samples: is (px,py) "inside" heart? returns 0..1 coverage
function heartCoverage(px, py, cx, cy, scale) {
  const offsets = [-0.25, 0.25];
  let inside = 0;
  for (const dx of offsets) for (const dy of offsets) {
    const mx = (px + dx - cx) / scale;
    const my = -(py + dy - cy) / scale; // flip y for pixel coords
    if (heartVal(mx, my) <= 0) inside++;
  }
  return inside / 4;
}

// ── Icon 1024×1024 ─────────────────────────────────────────────────────────
function iconPixel(x, y, w, h) {
  const t = y / h;
  // Background gradient: vibrant pink → deep wine
  const bgR = lerp(0xe9, 0x5c, t);
  const bgG = lerp(0x1e, 0x00, t);
  const bgB = lerp(0x8c, 0x28, t);

  // Two hearts side by side (Para Dos)
  const scale = w * 0.22;
  const cy = h * 0.50;
  const c1x = w * 0.38; // left heart
  const c2x = w * 0.62; // right heart

  const cov1 = heartCoverage(x, y, c1x, cy, scale);
  const cov2 = heartCoverage(x, y, c2x, cy, scale);
  const cov = Math.min(1, cov1 + cov2);

  if (cov > 0) {
    const alpha = Math.round(cov * 255);
    // Blend white over gradient
    const r = lerp(bgR, 255, cov);
    const g = lerp(bgG, 255, cov);
    const b = lerp(bgB, 255, cov);
    return [r, g, b, 255];
  }
  return [bgR, bgG, bgB, 255];
}

// ── Adaptive icon (Android foreground, transparent bg) ────────────────────
function adaptivePixel(x, y, w, h) {
  const scale = w * 0.22;
  const cy = h * 0.50;
  const c1x = w * 0.38;
  const c2x = w * 0.62;
  const cov1 = heartCoverage(x, y, c1x, cy, scale);
  const cov2 = heartCoverage(x, y, c2x, cy, scale);
  const cov = Math.min(1, cov1 + cov2);
  return [255, 255, 255, Math.round(cov * 255)];
}

// ── Splash 1284×2778 ───────────────────────────────────────────────────────
function splashPixel(x, y, w, h) {
  const t = y / h;
  const bgR = lerp(0xfc, 0xe8, t);
  const bgG = lerp(0xe4, 0xb0, t);
  const bgB = lerp(0xec, 0xcc, t);

  const scale = w * 0.22;
  const cy = h * 0.42;
  const c1x = w * 0.40;
  const c2x = w * 0.60;

  const cov1 = heartCoverage(x, y, c1x, cy, scale);
  const cov2 = heartCoverage(x, y, c2x, cy, scale);
  const cov = Math.min(1, cov1 + cov2);

  const hR = lerp(bgR, 0xe9, cov);
  const hG = lerp(bgG, 0x1e, cov);
  const hB = lerp(bgB, 0x8c, cov);
  return [hR, hG, hB, 255];
}

// ── Generate ───────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, 'assets');

console.log('Generating icon.png (1024×1024)...');
fs.writeFileSync(path.join(outDir, 'icon.png'), buildPNG(1024, 1024, iconPixel));
console.log('Done.');

console.log('Generating adaptive-icon.png (1024×1024)...');
fs.writeFileSync(path.join(outDir, 'adaptive-icon.png'), buildPNG(1024, 1024, adaptivePixel));
console.log('Done.');

console.log('Generating splash.png (1284×2778)...');
fs.writeFileSync(path.join(outDir, 'splash.png'), buildPNG(1284, 2778, splashPixel));
console.log('Done.');

console.log('\nAll assets created in ./assets/');
