import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';
    const searchParams = req.nextUrl.searchParams.toString();
    const url = `${apiUrl}/content/events${searchParams ? `?${searchParams}` : ''}`;

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
        success: false,
        error: 'Service Unavailable',
        message: 'Content service unreachable.',
      },
      { status: 503 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';
    const csrfToken = req.headers.get('x-csrf-token') || '';
    const body = await req.json();

    const backendRes = await fetch(`${apiUrl}/content/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Service Unavailable',
        message: 'Content service unreachable.',
      },
      { status: 503 },
    );
  }
}
