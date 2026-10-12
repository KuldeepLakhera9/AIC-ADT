import { NextRequest, NextResponse } from 'next/server';

export async function GET(
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
    const backendRes = await fetch(`${apiUrl}/media/${id}/download`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!backendRes.ok) {
      const data = await backendRes.json().catch(() => ({}));
      return NextResponse.json(data, { status: backendRes.status });
    }

    const contentType =
      backendRes.headers.get('Content-Type') || 'application/octet-stream';
    const contentDisposition =
      backendRes.headers.get('Content-Disposition') || 'attachment';
    const contentLength = backendRes.headers.get('Content-Length');

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Disposition': contentDisposition,
    };
    if (contentLength) {
      headers['Content-Length'] = contentLength;
    }

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      headers,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Service Unavailable',
        message: 'File streaming service unreachable.',
      },
      { status: 503 },
    );
  }
}
