import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const backendRes = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': req.headers.get('user-agent') || 'NextJS-Web-Proxy',
        'X-Forwarded-For': req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || 'Authentication Failed',
          message: data.message || 'Invalid email address or password.',
        },
        { status: backendRes.status },
      );
    }

    const response = NextResponse.json(data, { status: 200 });

    // Forward Set-Cookie headers from NestJS backend to browser
    const rawSetCookie = backendRes.headers.getSetCookie?.() || [];
    if (rawSetCookie.length > 0) {
      for (const cookieStr of rawSetCookie) {
        response.headers.append('Set-Cookie', cookieStr);
      }
    } else {
      const singleCookie = backendRes.headers.get('set-cookie');
      if (singleCookie) {
        response.headers.set('Set-Cookie', singleCookie);
      }
    }

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Authentication service temporarily unreachable.',
      },
      { status: 500 },
    );
  }
}
