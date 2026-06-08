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

  if (userCookie && userCookie.value) {
    try {
      const res = await fetch(`http://localhost:8080/hris-api/v1/user/token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userCookie.value}`,
        },
      });
      if (res.ok) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.warn(error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
};

export { authenticatedCheck };
