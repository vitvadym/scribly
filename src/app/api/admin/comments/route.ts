
import { getAllComments } from '@/utils/server/comments';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    console.log('search params', searchParams);
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit'));
    const orderBy = searchParams.get('orderBy');
    const searchQuery = searchParams.get('search');

    const { comments, hasMore } = await getAllComments({
      limit,
      page,
      order: orderBy as string,
      searchQuery: searchQuery as string,
    });

    return Response.json({ data: comments, hasMore });
  } catch (error) {
    console.error('Error fetching all comments:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
