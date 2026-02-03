import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function generateMarketingElementsImage() {
  console.log('Generating marketing elements image...');

  const zai = await ZAI.create();

  const response = await zai.images.generations.create({
    prompt: 'Professional product photography of promotional items, gadgets, and unconventional marketing elements, clean white background, studio lighting, high quality, sleek design, creative products',
    size: '1024x1024'
  });

  const imageBase64 = response.data[0].base64;

  // Save image
  const outputDir = './public/generated-images';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'product-marketing-elements.png');
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(outputPath, buffer);

  console.log(`✓ Marketing elements image saved to ${outputPath}`);
  return outputPath;
}

// Generate image
generateMarketingElementsImage().catch(console.error);
