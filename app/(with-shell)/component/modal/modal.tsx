"use client";
import React from "react";

export default function Modal({
  open,
  close,
  children,
}: {
  open: boolean;
  close: any;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`${open ? "flex" : "hidden"} justify-center items-center fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.05)]`}
    >
      <div
        onClick={close}
        className={`fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.05)] -z-2`}
      ></div>
      <>{children}</>
    </div>
  );
}
