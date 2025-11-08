import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Script: crop-team-images.js
// Crops Frankline's image to match Janet's dimensions and overwrites the original

async function cropAndResizeImage(inputPath, targetSize) {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${inputPath}`);
    process.exit(2);
  }

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;
  const aspectRatio = targetSize.width / targetSize.height;
  let extractWidth, extractHeight;
  
  if (width / height > aspectRatio) {
    // Image is wider than target ratio
    extractHeight = height;
    extractWidth = Math.round(height * aspectRatio);
  } else {
    // Image is taller than target ratio
    extractWidth = width;
    extractHeight = Math.round(width / aspectRatio);
  }

  // Extract a centered crop then resize
  await image
    .extract({ 
      left: Math.floor((width - extractWidth) / 2), 
      top: Math.floor((height - extractHeight) / 2), 
      width: extractWidth, 
      height: extractHeight 
    })
    .resize(targetSize.width, targetSize.height)
    .toBuffer()
    .then(buffer => {
      // Overwrite the original file
      return sharp(buffer).toFile(inputPath);
    });

  console.log(`Updated image: ${inputPath}`);
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public', 'images');
  const frankIn = path.join(publicDir, 'frankline-image.jpg');

  try {
    // Match Janet's dimensions
    await cropAndResizeImage(frankIn, { width: 864, height: 1113 });
  } catch (err) {
    console.error('Failed to crop images', err);
    process.exit(1);
  }
}

main();
