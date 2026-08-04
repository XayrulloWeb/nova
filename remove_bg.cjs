const Jimp = require('jimp');

async function removeBackground() {
  try {
    const image = await Jimp.read('public/logo.png');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If the pixel is very close to white (allow some tolerance for anti-aliasing)
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });
    
    await image.writeAsync('public/logo.png');
    console.log('Background removed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

removeBackground();
