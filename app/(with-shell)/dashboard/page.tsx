import Link from "next/link";
import React from "react";
import ApplciantOverview from "./component/applicantOverview";
import EmployeeOverview from "./component/employeeOverview";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-6 lg:col-span-3 bg-red-700 rounded-sm p-2 space-y-4">
        <EmployeeOverview />
      </div>
      <div className="col-span-6 lg:col-span-3 bg-red-700 rounded-sm p-2 space-y-4">
        <ApplciantOverview />
      </div>
    </div>
  );
}
