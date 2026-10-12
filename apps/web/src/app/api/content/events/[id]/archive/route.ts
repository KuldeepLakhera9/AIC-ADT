import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';
    const csrfToken = req.headers.get('x-csrf-token') || '';
    const searchParams = req.nextUrl.searchParams.toString();
    const url = `${apiUrl}/content/events/${id}/archive${searchParams ? `?${searchParams}` : ''}`;

    const backendRes = await fetch(url, {
      method: 'POST',
      headers: {
        Cookie: cookieHeader,
        'x-csrf-token': csrfToken,
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
