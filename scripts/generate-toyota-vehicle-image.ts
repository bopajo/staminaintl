import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function generateToyotaVehicleImage() {
  console.log('Generating Toyota Land Cruiser vehicle image...');

  const zai = await ZAI.create();

  const response = await zai.images.generations.create({
    prompt: 'Professional product photography of TOYOTA LAND CRUISER VXR V6 3.3L DIESEL 4WD 7-SEATER AUTOMATIC SUV, clean white background, studio lighting, high quality, industrial style, sleek design, front view, automotive',
    size: '1024x1024'
  });

  const imageBase64 = response.data[0].base64;

  // Save image
  const outputDir = './public/generated-images';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'product-vehicles-1.png');
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(outputPath, buffer);

  console.log(`✓ Toyota vehicle image saved to ${outputPath}`);
  return outputPath;
}

// Generate image
generateToyotaVehicleImage().catch(console.error);
