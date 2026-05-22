"use client";
import TrashIcon from "@/public/icons/trashIcon";
import Modal from "../../component/modal/modal";
import { useState } from "react";

export default function DeleteEmployee({
  id,
  cookie,
}: {
  id: number | string;
  cookie: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteEmployee = async () => {
    try {
      const res = await fetch(`http://localhost:8080/hris-api/v1/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });

      if (res.ok) {
        alert("Employee deleted successfully!");
        return;
      }

      alert("Employee deletion failed!");
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <TrashIcon />
      </button>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="bg-red-700 rounded-sm w-sm p-2 space-y-2">
          <div className="flex justify-between bg-white rounded-sm p-2">
            <div className="text-sm">Delete Employee</div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="p-2 bg-white rounded-sm">
            <div className="text-center text-md">Are you sure?</div>
            <div className="flex justify-between">
              <button className="btn btn-warning" onClick={deleteEmployee}>
                Yes
              </button>
              <button
                className="btn btn-active"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
