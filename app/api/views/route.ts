import { NextRequest, NextResponse } from 'next/server';
import { incrementPageView } from '@/lib/data/views';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const path = typeof body?.path === 'string' ? body.path : '/';

  const views = await incrementPageView(path);
  return NextResponse.json({ views });
}
