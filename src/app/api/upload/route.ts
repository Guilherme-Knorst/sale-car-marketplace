// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const upload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'car-marketplace' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json(upload, { status: 200 });
  } catch (err) {
    console.error('Erro no upload:', err);
    return NextResponse.json({ error: 'Erro ao enviar imagem' }, { status: 500 });
  }
};
