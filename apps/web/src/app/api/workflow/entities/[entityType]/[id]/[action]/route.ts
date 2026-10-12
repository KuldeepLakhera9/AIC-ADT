import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{
    entityType: string;
    id: string;
    action: string;
  }>;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { entityType, id, action } = await context.params;
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:4000/api/v1';

    const cookieHeader = req.headers.get('cookie') || '';
    const csrfToken = req.headers.get('x-csrf-token') || '';
    const body = await req.json();

    const backendRes = await fetch(`${apiUrl}/workflow/entities/${entityType}/${id}/${action}`, {
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
        message: 'Workflow service unreachable.',
      },
      { status: 503 },
    );
  }
}
