import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';

    const backendRes = await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        Cookie: cookieHeader,
      },
    }).catch(() => null);

    const response = NextResponse.json({ success: true, data: { loggedOut: true } });

    // Explicitly delete cookies
    response.cookies.delete('aic_session');
    response.cookies.delete('aic_csrf');

    if (backendRes) {
      const rawSetCookie = backendRes.headers.getSetCookie?.() || [];
      for (const cookieStr of rawSetCookie) {
        response.headers.append('Set-Cookie', cookieStr);
      }
    }

    return response;
  } catch {
    const response = NextResponse.json({ success: true, data: { loggedOut: true } });
    response.cookies.delete('aic_session');
    response.cookies.delete('aic_csrf');
    return response;
  }
}
