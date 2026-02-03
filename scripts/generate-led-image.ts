import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'public', 'generated-images');

async function generateImage(prompt, filename, size = '1024x1024') {
  try {
    const zai = await ZAI.create();
    const response = await zai.images.generations.create({
      prompt,
      size
    });

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');
    const outputPath = path.join(outputDir, filename);

    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Generated: ${filename}`);
    return outputPath;
  } catch (error) {
    console.error(`✗ Failed to generate ${filename}:`, error.message);
    throw error;
  }
}

async function generateLEDImage() {
  console.log('Generating LED Displays image...\n');

  await generateImage(
    'Ultra-modern high-tech LED display wall showing spectacular bright colorful dynamic content, futuristic digital signage, professional photography, cutting-edge LED technology, vibrant colors against dark background, impressive visual impact, commercial LED display system',
    'product-led-displays.png',
    '1024x1024'
  );

  console.log('\n✓ LED Displays image generated successfully!');
}

generateLEDImage().catch(console.error);
