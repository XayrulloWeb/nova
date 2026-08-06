const sharp = require('sharp');

const srcPath = 'C:/Users/user/Desktop/nova/public/logo.png';
const destPath = 'C:/Users/user/Desktop/nova/public/logo.webp';

async function compressImage() {
  try {
    await sharp(srcPath)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(destPath);
    console.log('logo.png compressed to logo.webp');
  } catch (err) {
    console.error('Error compressing image:', err);
  }
}

compressImage();
