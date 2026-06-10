import { Employee } from "@/app/interface";
import Link from "next/link";
import React, { Suspense } from "react";

async function EmployeeOverviewTable({
  cookie,
}: {
  cookie: string | undefined;
}): Promise<React.ReactNode> {
  const getEmployee = async () => {
    try {
      const res = await fetch("http://localhost:8080/hris-api/v1/user", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      if (res.ok) {
        const listJSON: any = await res.json();
        return listJSON.data;
      }

      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  };

  const listEmployee = await getEmployee();

  return (
    <>
      {listEmployee.map((employee: Employee) => (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.username}</td>
          <td>{employee.email}</td>
          <td>{employee.role.roleName}</td>
        </tr>
      ))}
    </>
  );
}

export default function EmployeeOverview({
  cookie,
}: {
  cookie: string | undefined;
}) {
  return (
    <>
      <Link
        className="inline-block underline font-semibold text-md text-white"
        href="/employee"
      >
        Employee
      </Link>
      <div className="bg-white rounded-sm p-2">
        <div className="overflow-x-auto h-60">
          <table className="table table-xs">
            <thead>
              <tr className="text-red-700">
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <Suspense>
                <EmployeeOverviewTable cookie={cookie} />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
