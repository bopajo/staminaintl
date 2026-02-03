import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const response = await zai.images.generations.create({
      prompt: prompt,
      size: '1344x768',
    });

    if (!response.data || !response.data[0] || !response.data[0].base64) {
      throw new Error('Invalid response from image generation API');
    }

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');

    // Save to public/generated-images directory
    const outputDir = path.join(process.cwd(), 'public', 'generated-images');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `pacific-port-${Date.now()}.png`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({
      success: true,
      imageUrl: `/generated-images/${filename}`,
      filename: filename,
      prompt: prompt,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
}
