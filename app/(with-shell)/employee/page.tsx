import { cookies } from "next/headers";
import type { Employee } from "../../interface";
import ViewEmployee from "./component/viewEmployee";
import EditEmployee from "./component/editEmployee";
import DeleteEmployee from "./component/deleteEmployee";
import AddEmployee from "./component/addEmployee";
import { Suspense } from "react";

async function TableContent(): Promise<React.ReactNode> {
  const cookieStorage = await cookies();
  const userCookie = cookieStorage.get("jwt");

  const getEmployee = async () => {
    try {
      const res = await fetch("http://localhost:8080/hris-api/v1/user", {
        cache: "no-store",
        // next: {
        //   revalidate: 1,
        // },
        headers: {
          Authorization: `Bearer ${userCookie?.value}`,
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
          <td className="flex justify-center items-center space-x-4">
            <ViewEmployee id={employee.id} cookie={userCookie?.value} />
            <EditEmployee id={employee.id} cookie={userCookie?.value} />
            <DeleteEmployee id={employee.id} cookie={userCookie?.value} />
          </td>
        </tr>
      ))}
    </>
  );
}

export default async function EmployeePage() {
  const cookieStorage = await cookies();
  const userCookie = cookieStorage.get("jwt");

  return (
    <div className="rounded-sm p-2 bg-red-700">
      <div className="flex justify-between">
        <AddEmployee cookie={userCookie?.value} />
        <label className="input bg-transparent text-white border-white">
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div>
      <div className="overflow-x-auto bg-white rounded-sm shadow-md">
        <table className="table table-md p-2">
          <thead>
            <tr className="text-red-700">
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <Suspense>
              <TableContent />
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}
