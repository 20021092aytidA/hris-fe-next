"use client";

import TrashIcon from "@/public/icons/trashIcon";
import React, { useState } from "react";
import Modal from "../../component/modal/modal";

export default function DeleteReqBtn({
  id,
  cookie,
}: {
  id: number;
  cookie: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteRequest = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/hris-api/v1/request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          method: "DELETE",
        },
      );

      if (res.ok) {
        alert("request deleted!");
        return;
      }
      alert("failed deleting request!");
    } catch (error) {
      console.warn(error);
      alert("failed deleting request!");
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
            <div className="text-sm">Delete Request</div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="p-2 bg-white rounded-sm">
            <div className="text-center text-md">Are you sure?</div>
            <div className="flex justify-between">
              <button className="btn btn-warning" onClick={deleteRequest}>
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
