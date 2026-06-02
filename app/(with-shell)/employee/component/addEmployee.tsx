"use client";

import WrenchIcon from "@/public/icons/wrenchIcon";
import Modal from "../../component/modal/modal";
import { useEffect, useState } from "react";
import { EmployeeDetail, EmployeePOST, Role } from "@/app/interface";
import { useRouter } from "next/navigation";

export default function AddEmployee({
  cookie,
}: {
  cookie: string | undefined;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<Role[]>();
  const [employeeDetail, setEmployeeDetail] = useState<EmployeePOST>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setEmployeeDetail({
        address: "",
        dateOfBirth: "",
        email: "",
        fullName: "",
        jobPosition: "",
        joinDate: "",
        password: "",
        roleID: -1,
        salary: "",
        userID: -1,
        username: "",
        leaveAmount: 0,
        note: "",
      });
      getRoles();
    }
  }, [isOpen]);

  const getRoles = async () => {
    try {
      const res = await fetch(`http://localhost:8080/hris-api/v1/role`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });

      if (res.ok) {
        const listJSON: any = await res.json();
        const listRole = listJSON.data;
        setRole(listRole);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const addEmployee = async () => {
    const addUserForm = {
      roleID: employeeDetail!.roleID,
      password: employeeDetail!.password,
      username: employeeDetail!.username,
      email: employeeDetail!.email,
    };

    try {
      const res = await fetch(`http://localhost:8080/hris-api/v1/user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify(addUserForm),
      });

      if (res.ok) {
        const listJSON: any = await res.json();
        console.log(listJSON);
        const userID = listJSON.data.id;

        const addUserDetailForm = {
          userID: userID,
          fullName: employeeDetail!.fullName,
          address: employeeDetail!.address,
          jobPosition: employeeDetail!.jobPosition,
          salary: employeeDetail!.salary,
          dateOfBirth: employeeDetail!.dateOfBirth,
          joinDate: employeeDetail!.joinDate,
          leaveAmount: employeeDetail?.leaveAmount,
          note: employeeDetail?.note,
        };

        const resDetail = await fetch(
          `http://localhost:8080/hris-api/v1/user-detail`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
            body: JSON.stringify(addUserDetailForm),
          },
        );

        if (resDetail.ok) {
          alert("user created successfully!");
          router.refresh();
        }
        alert("failed creating user!");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <button
        className="btn mb-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Add
      </button>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="bg-red-700 rounded-sm w-sm p-2 max-h-[90vh] space-y-2 text-xs overflow-y-auto">
          <div className="flex justify-between bg-white rounded-sm p-2">
            <div className="text-sm">Add Employee</div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="bg-white rounded-sm p-2">
            <div className="mb-1 underline text-center text-sm">
              User Credentials
            </div>
            <label className="block">Username</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.username}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  username: e.target.value,
                }));
              }}
            />
            <label className="block">Password</label>
            <input
              type="password"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.password}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  password: e.target.value,
                }));
              }}
            />
            <label className="block">Email</label>
            <input
              type="email"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.email}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  email: e.target.value,
                }));
              }}
            />
            <label className="block">Role</label>
            <select
              value={employeeDetail?.roleID}
              className="text-xs select w-full p-2 bg-gray-100 rounded-sm"
              onChange={(e) =>
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  roleID: Number(e.target.value),
                }))
              }
            >
              <option value={-1} disabled={true}>
                Pick a color
              </option>
              {Array.isArray(role)
                ? role?.map((r: Role) => {
                    return (
                      <option key={r.id} value={r.id}>
                        {r.roleName}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="bg-white rounded-sm p-2">
            <div className="mb-1 underline text-center text-sm">
              User Details
            </div>
            <label className="block">Full name</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.fullName}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  fullName: e.target.value,
                }));
              }}
            />
            <label className="block">Job Position</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.jobPosition}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  jobPosition: e.target.value,
                }));
              }}
            />
            <label className="block">Salary</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.salary}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  salary: e.target.value,
                }));
              }}
            />
            <label className="block">Join Date</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.joinDate}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  joinDate: e.target.value,
                }));
              }}
            />
            <label className="block">Address</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.address}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  address: e.target.value,
                }));
              }}
            />
            <label className="block">Date of birth</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.dateOfBirth}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  dateOfBirth: e.target.value,
                }));
              }}
            />
            <label className="block">Leave amount</label>
            <input
              type="number"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.leaveAmount}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  leaveAmount: Number(e.target.value),
                }));
              }}
            />
            <label className="block">Note</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.note}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  note: e.target.value,
                }));
              }}
            />
          </div>
          <button onClick={addEmployee} className="btn w-full">
            Add
          </button>
        </div>
      </Modal>
    </>
  );
}
