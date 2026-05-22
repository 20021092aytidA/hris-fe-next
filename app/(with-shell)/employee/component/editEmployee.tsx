"use client";

import WrenchIcon from "@/public/icons/wrenchIcon";
import Modal from "../../component/modal/modal";
import { useEffect, useState } from "react";
import { Employee, EmployeeDetail } from "@/app/interface";

export default function EditEmployee({
  id,
  cookie,
}: {
  id: number | string;
  cookie: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employeeDetail, setEmployeeDetail] = useState<EmployeeDetail>({
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      getData();
    }
  }, [isOpen]);

  const getData = async () => {
    setIsLoading(true);
    await getEmployeeDetail();
    setIsLoading(false);
  };

  const getEmployeeDetail = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/hris-api/v1/user-detail?user_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      );

      if (res.ok) {
        const listJSON = await res.json();
        const currEmployeeDetail = listJSON.data[0];
        setEmployeeDetail(currEmployeeDetail);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const saveAll = async () => {};

  const saveUser = async () => {};

  const saveUserDetail = async () => {};

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <WrenchIcon />
      </button>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="bg-red-700 rounded-sm w-sm p-2 space-y-2 text-xs">
          <div className="flex justify-between bg-white rounded-sm p-2">
            <div className="text-sm">Edit Employee</div>
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
              value={employeeDetail?.user.username}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    username: e.target.value,
                  },
                }));
              }}
            />
            <label className="block">Email</label>
            <input
              type="email"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.user.email}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    email: e.target.value,
                  },
                }));
              }}
            />
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
                  ...prev,
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
                  ...prev,
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
                  ...prev,
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
                  ...prev,
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
                  ...prev,
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
                  ...prev,
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
                  ...prev,
                  leaveAmount: Number(e.target.value),
                }));
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
