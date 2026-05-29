"use client";

import WrenchIcon from "@/public/icons/wrenchIcon";
import Modal from "../../component/modal/modal";
import { useEffect, useState } from "react";
import { Employee, EmployeeDetail, EmployeePUT, Role } from "@/app/interface";

export default function EditEmployee({
  id,
  cookie,
}: {
  id: number | string;
  cookie: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employeeDetail, setEmployeeDetail] = useState<EmployeePUT>();
  const [role, setRole] = useState<Role>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      getData();
    }
  }, [isOpen]);

  const getData = async () => {
    setIsLoading(true);
    await getEmployeeDetail();
    await getRoles();
    setIsLoading(false);
  };

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
        setEmployeeDetail({
          userDetailID: currEmployeeDetail.id,
          username: currEmployeeDetail.user.username,
          userID: currEmployeeDetail.userID,
          roleID: currEmployeeDetail.user.roleID,
          address: currEmployeeDetail.address,
          dateOfBirth: currEmployeeDetail.dateOfBirth
            ? currEmployeeDetail.dateOfBirth.split("T")[0]
            : "",
          email: currEmployeeDetail.user.email,
          fullName: currEmployeeDetail.fullName,
          jobPosition: currEmployeeDetail.jobPosition,
          joinDate: currEmployeeDetail.joinDate
            ? currEmployeeDetail.joinDate.split("T")[0]
            : "",
          salary: currEmployeeDetail.salary,
          leaveAmount: currEmployeeDetail.leaveAmount,
          note: currEmployeeDetail.note,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const saveAll = async () => {
    const editUserForm: Record<string, any> = {};
    const editUserDetailForm: Record<string, any> = {};

    Object.entries(employeeDetail!).forEach(([key, value]) => {
      if (value !== undefined && value != "") {
        if (key === "username" || key === "email" || key === "roleID") {
          editUserForm[key] = value;
        } else {
          editUserDetailForm[key] = value;
        }
      }
    });

    let userEdited = false;
    let userDetailEdited = false;
    if (Object.entries(editUserForm).length !== 0) {
      userEdited = await saveUser(editUserForm);
    }
    if (Object.entries(editUserDetailForm).length !== 0) {
      userDetailEdited = await saveUserDetail(editUserDetailForm);
    }

    alert(
      `user: ${userEdited ? "successfully edited!" : "failed editing!"}\nuser detail:${userDetailEdited ? "successfully edited!" : "failed editing!"}`,
    );
  };

  const saveUser = async (form: Record<string, any>): Promise<boolean> => {
    try {
      const res = await fetch(
        `http://localhost:8080/hris-api/v1/user/${employeeDetail?.userID}`,

        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          body: JSON.stringify(form),
        },
      );

      if (res.ok) {
        return true;
      }

      return false;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const saveUserDetail = async (
    form: Record<string, any>,
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `http://localhost:8080/hris-api/v1/user-detail/${employeeDetail?.userDetailID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          body: JSON.stringify(form),
        },
      );

      if (res.ok) {
        return true;
      }
      return false;
    } catch (error) {
      alert("failed editing user!");
      console.warn(error);

      return false;
    }
  };

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <WrenchIcon />
      </button>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="bg-red-700 rounded-sm w-sm p-2 max-h-[90vh] overflow-y-auto space-y-2 text-xs">
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
              value={employeeDetail?.username ?? ""}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  username: e.target.value,
                }));
              }}
            />
            <label className="block">Email</label>
            <input
              type="email"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={employeeDetail?.email ?? ""}
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
              value={employeeDetail?.fullName ?? ""}
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
              value={employeeDetail?.jobPosition ?? ""}
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
              value={employeeDetail?.salary ?? ""}
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
              value={employeeDetail?.joinDate ?? ""}
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
              value={employeeDetail?.address ?? ""}
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
              value={employeeDetail?.dateOfBirth ?? ""}
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
              value={employeeDetail?.leaveAmount ?? 0}
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
              value={employeeDetail?.note ?? ""}
              onChange={(e) => {
                setEmployeeDetail((prev) => ({
                  ...prev!,
                  note: e.target.value,
                }));
              }}
            />
          </div>
          <button onClick={saveAll} className="btn w-full">
            Edit
          </button>
        </div>
      </Modal>
    </>
  );
}
