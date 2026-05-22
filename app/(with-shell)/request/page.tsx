import { cookies } from "next/headers";
import React from "react";

export default async function RequestPage() {
  type Employee = {
    id: number;
    roleID: number;
    username: string;
    email: string;
    role: {
      id: number;
      roleName: string;
    };
  };

  type Request = {
    id: number;
    userID: number;
    title: string;
    description: string;
    status: string;
    user: Employee;
  };

  let listRequest: Request[] = [];

  const getRequests = async () => {
    try {
      const cookieStorage = await cookies();
      const userCookie = cookieStorage.get("jwt");

      const res = await fetch("http://localhost:8080/hris-api/v1/request", {
        headers: {
          Authorization: `Bearer ${userCookie?.value}`,
        },
      });
      if (res.ok) {
        const listJSON: any = await res.json();
        listRequest = listJSON.data[0];
      }
    } catch (error) {
      console.warn(error);
    }
  };

  await getRequests();

  return (
    <div className="rounded-sm p-2 bg-red-700">
      <div className="flex justify-end mb-2">
        <label className="input bg-transparent text-white border-white">
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div>
      <div className="overflow-x-auto bg-white rounded-sm shadow-md">
        <table className="table table-md p-2">
          <thead>
            <tr className="text-red-700">
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {listRequest?.map((request: Request) => {
              return (
                <tr key={request.id}>
                  <th>{request.id}</th>
                  <td>{request.title}</td>
                  <td>{request.description}</td>
                  <td>{request.status}</td>
                  <td>{request.user.username}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
