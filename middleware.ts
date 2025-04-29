import {NextRequest, NextResponse} from 'next/server';

const protectedPath = ['/sketch'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedPath = protectedPath.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }
}
