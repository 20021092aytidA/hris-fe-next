"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logOut = async () => {
  const cookieStorage = await cookies();
  const userCookie = cookieStorage.get("jwt");
  if (userCookie) {
    cookieStorage.delete("jwt");
  }

  redirect("/login");
};

export { logOut };
