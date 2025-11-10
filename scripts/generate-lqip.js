#!/usr/bin/env node
// Small script to generate tiny base64 LQIP placeholders for images referenced in src/data
// Usage: node scripts/generate-lqip.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function toBase64(imgPath) {
  const buf = await sharp(imgPath).resize(20).blur(1).toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

async function main() {
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  const outFile = path.join(__dirname, '..', 'public', 'lqip.json');
  const result = {};

  // load all files in src/data and look for .src or coverArt fields by scanning exported arrays
  const dataFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('.ts') || f.endsWith('.js'));
  for (const file of dataFiles) {
    const full = path.join(dataDir, file);
    const text = fs.readFileSync(full, 'utf8');
    const urls = Array.from(text.matchAll(/\b(?:src|thumbnail|coverArt)\s*:\s*['"]([^'\"]+)['"]/g)).map((m) => m[1]);
    for (const u of urls) {
      if (u.startsWith('/')) {
        const imgPath = path.join(__dirname, '..', 'public', u.replace(/^\//, ''));
        if (fs.existsSync(imgPath)) {
          try {
            const b = await toBase64(imgPath);
            result[u] = b;
            console.log('generated lqip for', u);
          } catch (e) {
            console.warn('failed to process', imgPath, e.message);
          }
        }
      } else if (u.startsWith('http')) {
        // skip remote for now
      }
    }
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  console.log('Wrote', outFile);
}

main().catch((e) => { console.error(e); process.exit(1); });
