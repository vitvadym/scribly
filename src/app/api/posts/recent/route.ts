import { db } from '@/db';
import { post } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const recentPosts = await db.query.post.findMany({
      orderBy: desc(post.createdAt),
      limit: 4,
      with: {
        author: {
          columns: {
            name: true,
          },
        },
      },
    });
    return Response.json({ recentPosts });
  } catch (error) {
    console.error('Error fetching posts data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
