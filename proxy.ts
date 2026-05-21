import type { NextRequest } from "next/server";
import { authenticatedCheck } from "./middleware/authenticate";

export async function proxy(req: NextRequest) {
  // FUNCTIONS
  return await authenticatedCheck(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (this is where your CSS and JS live!)
     * - _next/image (image optimization)
     * - favicon.ico (your site icon)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
