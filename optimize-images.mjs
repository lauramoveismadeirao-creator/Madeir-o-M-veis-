#!/usr/bin/env node
import { globby } from 'globby';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  inputDirs: ['src/assets', 'public/assets'],
  outputDir: 'optimized-assets',
  patterns: ['**/*.{png,jpg,jpeg}'],
  maxWidth: 1600,
  jpegQuality: 82,
  pngCompressionLevel: 9,
  webpQuality: 80
};

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function optimizeImage(filePath) {
  const source = sharp(filePath, { failOn: 'none' });
  const metadata = await source.metadata();

  let pipeline = source.clone();
  if (metadata.width && metadata.width > CONFIG.maxWidth) {
    pipeline = pipeline.resize({ width: CONFIG.maxWidth });
  }

  const ext = path.extname(filePath).toLowerCase();
  const relative = path.relative(process.cwd(), filePath);
  const outputBase = path.join(CONFIG.outputDir, relative);
  const outputDir = path.dirname(outputBase);
  await ensureDir(outputDir);

  if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true }).toFile(outputBase.replace(/\.(jpg|jpeg)$/i, '.jpg'));
  } else if (ext === '.png') {
    await pipeline.png({ quality: CONFIG.jpegQuality, compressionLevel: CONFIG.pngCompressionLevel }).toFile(outputBase);
  }

  await pipeline.webp({ quality: CONFIG.webpQuality }).toFile(`${outputBase}.webp`);

  return {
    original: relative,
    optimized: path.relative(process.cwd(), outputBase),
    metadata
  };
}

async function run() {
  const allFiles = [];
  for (const dir of CONFIG.inputDirs) {
    const absDir = path.resolve(__dirname, dir);
    const files = await globby(CONFIG.patterns, { cwd: absDir, absolute: true });
    allFiles.push(...files);
  }

  if (allFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Optimizing ${allFiles.length} image(s)...`);
  const results = await Promise.allSettled(allFiles.map(optimizeImage));

  const successes = results.filter(r => r.status === 'fulfilled');
  const failures = results.filter(r => r.status === 'rejected');

  successes.forEach(({ value }) => {
    console.log(`✔ ${value.original} → ${value.optimized}`);
  });

  if (failures.length) {
    console.log('\nThe following files failed to optimize:');
    failures.forEach(({ reason }) => console.error(reason));
  }

  console.log(`\nDone. Generated files are stored in "${CONFIG.outputDir}".`);
}

run().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
