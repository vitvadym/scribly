import cloudinary from '@/lib/cloudinary';
import 'dotenv/config';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const signature = cloudinary.utils.api_sign_request(
      body.paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string,
    );

    return Response.json({ signature });
  } catch (error) {
    console.error('Error fetching posts data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
