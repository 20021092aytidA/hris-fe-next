"use client";

import EyeIcon from "@/public/icons/eyeIcon";
import { useEffect, useState } from "react";
import Modal from "../../component/modal/modal";
import { EmployeeDetail } from "@/app/interface";

export default function ViewEmployee({
  id,
  cookie,
}: {
  id: number | string;
  cookie: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeDetail>({
    user: {
      username: "",
      email: "",
      id: -1,
      role: {
        id: -1,
        roleName: "",
      },
      roleID: -1,
    },
    userID: -1,
    address: "",
    dateOfBirth: "",
    fullName: "",
    id: -1,
    jobPosition: "",
    joinDate: "",
    leaveAmount: -1,
    note: "",
    salary: "",
  });

  useEffect(() => {
    if (isOpen) {
      getEmployee();
    }
  }, [isOpen]);

  const getEmployee = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/hris-api/v1/user-detail?user_id=${typeof id === "number" ? id.toString() : id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      );

      if (res.ok) {
        const listJSON: any = await res.json();
        const currEmployee = listJSON.data[0];
        setEmployee(currEmployee);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <EyeIcon />
      </button>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="bg-red-700 rounded-sm w-sm p-2 space-y-2 text-xs">
          <div className="flex justify-between bg-white rounded-sm p-2">
            <div className="text-sm">View Employee</div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="bg-white rounded-sm p-2">
            <div className="mb-1 underline text-center text-sm">
              User Credentials
            </div>
            <div>Username</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.user.username}
            </div>
            <div>Email</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.user.email}
            </div>
            <div>Role</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.user.role.roleName}
            </div>
          </div>
          <div className="bg-white rounded-sm p-2">
            <div className="mb-1 underline text-center text-sm">
              User Details
            </div>
            <div>Full name</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.fullName}
            </div>
            <div>Job Position</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.jobPosition}
            </div>
            <div>Salary</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.salary}
            </div>
            <div>Join Date</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.joinDate.split("T")[0]}
            </div>
            <div>Address</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.address}
            </div>
            <div>Date of birth</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.dateOfBirth.split("T")[0]}
            </div>
            <div>Leave amount</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.leaveAmount ?? 0}
            </div>
            <div>Note</div>
            <div className="p-2 bg-gray-100 rounded-sm text-end">
              {employee?.note}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
