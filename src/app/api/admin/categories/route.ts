import { db } from '@/db';
import { category } from '@/db/schema';
import { getCategoriesDashboard } from '@/utils/server/categories';
import { NextRequest } from 'next/server';
export async function GET() {
  try {
    const categories = await getCategoriesDashboard();
    return Response.json(categories);
  } catch (error) {
    console.error('Error fetching categories data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCategory = await db.insert(category).values(body).returning();
    return Response.json(newCategory);
  } catch (error) {
    console.error('Error fetching categories data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
