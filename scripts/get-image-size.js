import sharp from 'sharp';
import path from 'path';

async function getSize() {
  const publicDir = path.join(process.cwd(), 'public', 'images');
  const janetPath = path.join(publicDir, 'janet-image.jpg');
  
  try {
    const metadata = await sharp(janetPath).metadata();
    console.log('Janet image dimensions:', {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format
    });
  } catch (err) {
    console.error('Failed to get image size:', err);
    process.exit(1);
  }
}

getSize();