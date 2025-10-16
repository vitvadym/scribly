export async function GET() {
  try {
    return Response.json({ message: 'Hello from the admin API!' });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}