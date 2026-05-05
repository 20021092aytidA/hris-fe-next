"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const nav = useRouter();
  nav.push("/login");
}
