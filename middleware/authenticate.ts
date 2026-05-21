import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const authenticatedCheck = async (req: NextRequest): Promise<NextResponse> => {
  const { pathname } = req.nextUrl;
  if (pathname === "/login") return NextResponse.next();

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("jwt");
  if (!userCookie || !userCookie?.value) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export { authenticatedCheck };
