import { getAllCategories } from '@/utils/server/categories';
export async function GET() {
  try {
    const categories = await getAllCategories();
    console.log('categories api', categories);
    return Response.json(categories);
  } catch (error) {
    console.error('Error fetching categories data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
