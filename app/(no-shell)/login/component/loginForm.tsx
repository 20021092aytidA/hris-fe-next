"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const nav = useRouter();
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [isRemeber, setIsRemeber] = useState<boolean>(false);

  const handleLogin = () => {
    nav.push("/dashboard");
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <fieldset className="col-span-6 sm:col-span-3 fieldset mb-2">
          <legend className="fieldset-legend text-black">Email</legend>
          <input
            type="email"
            required
            className="input bg-white text-xs outline outline-gray-200"
            placeholder="Input email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="col-span-6 sm:col-span-3 fieldset">
          <legend className="fieldset-legend text-black">Password</legend>
          <input
            type="password"
            required
            className="input bg-white text-xs outline outline-gray-200"
            placeholder="Input password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </fieldset>
      </div>
      <div className="flex justify-between">
        <div className="flex fieldset items-center">
          <label htmlFor="rememberCheck" className=" cursor-pointer">
            Remember me
          </label>
          <input
            id="rememberCheck"
            type="checkbox"
            checked={isRemeber}
            onChange={() => setIsRemeber(isRemeber ? false : true)}
            className="size-5 checkbox rounded-md border-gray-300 checked:bg-red-700! checked:text-white"
          />
        </div>
        <button
          className="px-4 py-2 font-semibold hover:underline text-white bg-red-700! hover:bg-red-800! rounded-sm cursor-pointer text-sm shadow-md"
          onClick={() => handleLogin()}
        >
          login
        </button>
      </div>
    </>
  );
}
