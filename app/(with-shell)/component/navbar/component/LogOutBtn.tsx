"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { logOut } from "./logOutFunc";

export default function LogOutBtn() {
  return <button onClick={logOut}>Log out</button>;
}
