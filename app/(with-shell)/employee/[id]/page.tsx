import { notFound } from "next/navigation";
import React from "react";

export default async function EmployeeDetailView({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  if (!id) return notFound();

  return <div className="text-black">{id}</div>;
}
