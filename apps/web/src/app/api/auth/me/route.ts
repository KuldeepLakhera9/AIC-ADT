import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';

    const backendRes = await fetch(`${apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || 'Unauthorized',
          message: data.message || 'Session expired or unauthenticated.',
        },
        { status: backendRes.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Service Unavailable',
        message: 'Auth service unreachable.',
      },
      { status: 503 },
    );
  }
}
