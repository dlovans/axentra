// Generate PNG favicons from SVG
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Favicon sizes to generate
const sizes = [16, 32, 48, 64, 96, 128, 192, 256];

// Path to your SVG favicon
const svgPath = path.join(__dirname, '../static/favicon.svg');
const outputDir = path.join(__dirname, '../static');

async function generateFavicons() {
  try {
    // Read SVG file
    console.log(`Reading SVG file: ${svgPath}`);
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Create a data URL from the SVG content
    const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
    
    // Load the SVG as an image
    const img = await loadImage(svgDataUrl);
    
    // Generate each size
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);
      
      const pngBuffer = canvas.toBuffer('image/png');
      const outputPath = path.join(outputDir, `favicon-${size}.png`);
      
      fs.writeFileSync(outputPath, pngBuffer);
      console.log(`Generated: ${outputPath}`);
    }
    
    // Also generate a favicon.png file (32px by default)
    const faviconCanvas = createCanvas(32, 32);
    const faviconCtx = faviconCanvas.getContext('2d');
    faviconCtx.drawImage(img, 0, 0, 32, 32);
    
    const faviconBuffer = faviconCanvas.toBuffer('image/png');
    const faviconPath = path.join(outputDir, 'favicon.png');
    
    fs.writeFileSync(faviconPath, faviconBuffer);
    console.log(`Generated: ${faviconPath}`);
    
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 