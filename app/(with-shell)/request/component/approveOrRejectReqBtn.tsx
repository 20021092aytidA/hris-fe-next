"use client";
import React, { useState } from "react";
import Modal from "../../component/modal/modal";
import CheckIcon from "@/public/icons/checkIcon";
import XIcon from "@/public/icons/xIcon";
import { useRouter } from "next/navigation";

export default function ApproveOrRejectReqBtn({
  id,
  cookie,
  isApproving,
}: {
  id: number;
  cookie: string | undefined;
  isApproving: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateRequest = async () => {
    const form = {
      status: `${isApproving ? "APPROVED" : "REJECTED"}`,
    };

    try {
      const res = await fetch(
        `http://localhost:8080/hris-api/v1/request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          method: "PUT",
          body: JSON.stringify(form),
        },
      );

      if (res.ok) {
        alert("request updated!");
        router.refresh();
        return;
      }
      alert("failed updating request!");
    } catch (error) {
      console.warn(error);
      alert("failed updating request!");
    }
  };

  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        {isApproving ? <CheckIcon /> : <XIcon />}
      </button>
      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="bg-red-700 rounded-sm w-sm p-2 space-y-2">
          <div className="flex justify-between bg-white rounded-sm p-2">
            <div className="text-sm">
              {isApproving ? "Approve" : "Reject"} Request
            </div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="p-2 bg-white rounded-sm">
            <div className="text-center text-md">Are you sure?</div>
            <div className="flex justify-between">
              <button className="btn btn-warning" onClick={updateRequest}>
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
