import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FOLDER = path.join(__dirname, 'public', 'image');

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r)      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else                h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

async function removeBg(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const pixels = new Uint8ClampedArray(data);

  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    const [h, s, l] = rgbToHsl(r, g, b);

    // Is this pixel in the green-screen hue range?
    const inGreenHue = h >= 85 && h <= 165 && s > 0.25 && l > 0.1 && l < 0.95;

    // Greenness: how much green exceeds the max of red/blue
    const greenExcess = g - Math.max(r, b);

    if (inGreenHue) {
      if (greenExcess > 50) {
        // Core green screen → fully transparent
        pixels[i + 3] = 0;
        continue;
      } else if (greenExcess > 10) {
        // Transitional edge → feather alpha
        const t = (greenExcess - 10) / 40; // 0..1
        pixels[i + 3] = Math.round((1 - t) * 255);
      }
    }

    // ── Green spill suppression (even for opaque pixels) ──────────────────
    // Any pixel where green noticeably exceeds R and B gets desaturated
    if (greenExcess > 5 && pixels[i + 3] > 0) {
      // Reduce green to match the average of R and B (luminance preserved)
      const avg = (r + b) / 2;
      const deSpill = Math.min(greenExcess, 80); // max correction
      pixels[i + 1] = Math.round(g - deSpill * 0.85);
      // Slightly warm up red to fill the gap
      pixels[i]     = Math.min(255, Math.round(r + deSpill * 0.15));
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 8 })
    .toFile(outputPath);
}

// ── Main ────────────────────────────────────────────────────────────────────
const files = (await readdir(FOLDER)).filter(f => /\.(jpg|jpeg)$/i.test(f));
console.log(`🎬 Found ${files.length} frames — running chroma key + spill removal...`);

let done = 0;
for (const file of files) {
  const inputPath  = path.join(FOLDER, file);
  const outputPath = path.join(FOLDER, file.replace(/\.(jpg|jpeg)$/i, '.png'));
  await removeBg(inputPath, outputPath);
  done++;
  process.stdout.write(`\r  [${done}/${files.length}] ${file}`);
}

console.log(`\n\n✅ Done! ${done} clean PNGs in: ${FOLDER}`);
