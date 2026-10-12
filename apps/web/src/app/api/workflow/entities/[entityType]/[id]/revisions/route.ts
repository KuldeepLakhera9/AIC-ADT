import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{
    entityType: string;
    id: string;
  }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { entityType, id } = await context.params;
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';
    const searchParams = req.nextUrl.searchParams.toString();
    const url = `${apiUrl}/workflow/entities/${entityType}/${id}/revisions${
      searchParams ? `?${searchParams}` : ''
    }`;

    const backendRes = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
