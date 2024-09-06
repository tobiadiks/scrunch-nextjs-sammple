import { NextResponse } from 'next/server';
import compressImage from 'scrunchjs';

export async function POST(req) {

    try {
      const buffer = Buffer.from(await req.arrayBuffer());
      const compressedBuffer = await compressImage({
        input: buffer,
        maxWidth: 1920,
        initialQuality: 70,
        minQuality: 10,
        maxFileSize: 200 * 1024
      });

      return new Response(compressedBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Length': compressedBuffer.length.toString(),
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error compressing image' });
    }
};