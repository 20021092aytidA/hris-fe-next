"use client";
import EyeIcon from "@/public/icons/eyeIcon";
import React, { useEffect, useState } from "react";
import Modal from "../../component/modal/modal";
import { Request } from "@/app/interface";

export default function ViewReqBtn({
  id,
  cookie,
}: {
  id: number;
  cookie: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [req, setReq] = useState<Request>();

  useEffect(() => {
    if (isOpen) {
      getRequest();
    }
  }, [isOpen]);

  const getRequest = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/hris-api/v1/request?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      );

      if (res.ok) {
        const listJSON: any = await res.json();
        const currReq = listJSON.data[0];
        setReq(currReq);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <EyeIcon />
      </button>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <div className="w-200 bg-red-700 p-2 max-h-[90vh] rounded-sm overflow-y-auto space-y-2">
          <div className="flex justify-between bg-white rounded-sm p-2">
            <div className="text-sm">View Request</div>
            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <div className="bg-white p-2 rounded-sm">
            <div className="flex justify-between">
              <div className="underline">{req?.user.username}</div>
              <div className="underline">{req?.user.email}</div>
            </div>
            <div>Title</div>
            <div className="p-2 bg-gray-100 rounded-sm text-start">
              {req?.title}
            </div>
            <div>Content</div>
            <div className="p-2 bg-gray-100 rounded-sm text-start min-h-40">
              {req?.description}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
