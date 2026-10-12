import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';
    const searchParams = req.nextUrl.searchParams.toString();
    const url = `${apiUrl}/workflow/audit-logs${searchParams ? `?${searchParams}` : ''}`;

    const backendRes = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      },
      { status: 200 },
    );
  }
}
