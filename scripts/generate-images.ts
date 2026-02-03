import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'public', 'generated-images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateImage(prompt, filename, size = '1344x768') {
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

async function generateAllImages() {
  console.log('Generating images for STAMINA PENGJU website...\n');

  const images = [
    {
      prompt: 'Professional international trade and logistics, modern container ship at port, clean minimalist style, soft blue and gray tones, high quality photography',
      filename: 'hero-banner.png',
      size: '1440x720'
    },
    {
      prompt: 'Industrial equipment in modern factory, professional product photography, white background, clean lighting, minimalist style',
      filename: 'product-industrial.png',
      size: '1024x1024'
    },
    {
      prompt: 'Construction materials neatly organized, professional photography, white background, modern industrial style',
      filename: 'product-construction.png',
      size: '1024x1024'
    },
    {
      prompt: 'Electrical components and circuit boards, professional product photography, clean white background, modern tech style',
      filename: 'product-electrical.png',
      size: '1024x1024'
    },
    {
      prompt: 'Packaging solutions and boxes, professional photography, minimalist white background, clean industrial style',
      filename: 'product-packaging.png',
      size: '1024x1024'
    },
    {
      prompt: 'Business handshake between international partners, professional corporate photography, modern office setting, soft lighting',
      filename: 'process-verification.png',
      size: '1344x768'
    },
    {
      prompt: 'Quality control inspector checking products in factory, professional photography, clean industrial setting, modern equipment',
      filename: 'process-quality.png',
      size: '1344x768'
    },
    {
      prompt: 'Modern warehouse and logistics operations, forklift and containers, professional photography, clean industrial style',
      filename: 'process-logistics.png',
      size: '1344x768'
    },
    {
      prompt: 'Delivery truck arriving at modern facility, professional photography, sunny day, clean commercial style',
      filename: 'process-delivery.png',
      size: '1344x768'
    },
    {
      prompt: 'Modern Asian manufacturing facility with production lines, professional industrial photography, clean organized factory',
      filename: 'gallery-factory.png',
      size: '1344x768'
    },
    {
      prompt: 'Quality control laboratory with testing equipment, professional photography, modern clean facility',
      filename: 'gallery-quality.png',
      size: '1344x768'
    },
    {
      prompt: 'International shipping containers at port terminal, professional photography, modern logistics hub, soft colors',
      filename: 'gallery-shipping.png',
      size: '1344x768'
    }
  ];

  for (const img of images) {
    await generateImage(img.prompt, img.filename, img.size);
    // Add small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✓ All images generated successfully!');
}

generateAllImages().catch(console.error);
