"use client";

import React, { useState } from "react";
import Modal from "../../component/modal/modal";
import { jwtDecode } from "jwt-decode";
import { Request } from "@/app/interface";

export default function AddReqBtn({ cookie }: { cookie: string | undefined }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [req, setReq] = useState<Request>();

  const addReq = async () => {
    const readableJWT: any = jwtDecode(cookie ?? "");

    let currUserID: number;
    if (readableJWT) {
      currUserID = readableJWT.userID;
    }

    const jsonForm = {
      userID: currUserID!,
      title: req?.title,
      description: req?.description,
    };

    try {
      const res = await fetch(`http://localhost:8080/hris-api/v1/request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify(jsonForm),
      });

      if (res.ok) {
        alert("request created!");
        return;
      }

      alert("failed creating request!");
    } catch (error) {
      console.warn(error);
      alert("failed creating request!");
    }
  };

  return (
    <>
      <button className="btn cursor-pointer" onClick={() => setIsOpen(true)}>
        Add
      </button>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="bg-red-700 rounded-sm w-sm p-2 max-h-[90vh] space-y-2 text-xs overflow-y-auto">
          <div className="flex justify-between bg-white rounded-sm p-2">
            <div className="text-sm">Add Request</div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="bg-white rounded-sm p-2">
            <label className="block">Title</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-end"
              value={req?.title ?? ""}
              onChange={(e) => {
                setReq((prev) => ({
                  ...prev!,
                  title: e.target.value,
                }));
              }}
            />
            <label className="block">Description</label>
            <input
              type="text"
              className="p-2 bg-gray-100 w-full rounded-sm text-start"
              value={req?.description ?? ""}
              onChange={(e) => {
                setReq((prev) => ({
                  ...prev!,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <button onClick={addReq} className="btn w-full">
            Add
          </button>
        </div>
      </Modal>
    </>
  );
}
