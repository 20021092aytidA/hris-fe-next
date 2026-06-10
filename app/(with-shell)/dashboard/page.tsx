import Link from "next/link";
import React from "react";
import ApplciantOverview from "./component/requestOverview";
import EmployeeOverview from "./component/employeeOverview";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookie = await cookies();
  const userCookie = cookie.get("jwt");

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6 lg:col-span-3 bg-red-700 rounded-sm p-2 space-y-4">
          <EmployeeOverview cookie={userCookie?.value} />
        </div>
        <div className="col-span-6 lg:col-span-3 bg-red-700 rounded-sm p-2 space-y-4">
          <ApplciantOverview cookie={userCookie?.value} />
        </div>
      </div>
    </div>
  );
}
