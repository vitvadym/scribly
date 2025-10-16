// import { db } from "@/db";
import { getFeaturedPosts } from '@/utils/server-utils';

export async function GET() {
  try {
    const featuredPosts = await getFeaturedPosts();
    return Response.json({ featuredPosts });
  } catch (error) {
    console.error('Error fetching posts data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
