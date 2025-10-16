import cloudinary from '@/lib/cloudinary';
import { NextRequest } from 'next/server';
import { db } from '@/db';
import { asset } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (session && session.user) {
      const body = await request.json();
      const currentUserId = session.user.id;

      const { publicId, assetId, url } = body;

      const newUpload = {
        url,
        publicId,
        assetId,
        userId: currentUserId,
      };

      const [uploadResponse] = await db
        .insert(asset)
        .values(newUpload)
        .returning({
          id: asset.id,
        });

      if (uploadResponse.id) {
        return Response.json({ success: true });
      }

      return Response.json(
        { error: 'Failed to upload asset' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error uploading asset:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const publicId = await request.json();

    if (!publicId) {
      return Response.json({ error: 'Missing imagePublicId' }, { status: 400 });
    }

    const cloudinaryResponse = await cloudinary.uploader.destroy(
      publicId,
    );

    const [dbResponse] = await db
      .delete(asset)
      .where(eq(asset.publicId, publicId))
      .returning({
        id: asset.id,
      });

    if (cloudinaryResponse.result === 'ok' && dbResponse.id) {
      return Response.json({ success: true, id: dbResponse.id });
    }

    return Response.json({ error: 'Failed to delete asset' }, { status: 500 });
  } catch (error) {
    console.error('Error deleting asset:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
