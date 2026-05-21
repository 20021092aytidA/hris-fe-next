"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const nav = useRouter();
  const [username, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const handleLogin = async () => {
    // nav.push("/dashboard");
    // return;

    const jsonReq = {
      username: username,
      password: pass,
    };

    try {
      const res = await fetch("http://localhost:8080/hris-api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonReq),
        credentials: "include",
      });

      if (res.ok) {
        const jsonRes: any = await res.json();
        alert("login success");
        nav.push("/dashboard");
        return;
      }

      switch (res.status) {
        case 404:
          alert("login failed!\nuser not found");
          break;

        case 401:
          alert("login failed!\nwrong credentials");
          break;

        default:
          alert("login failed");
          break;
      }
    } catch (error) {
      alert(`login failed:\n${error}`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <fieldset className="col-span-6 sm:col-span-3 fieldset mb-2">
          <legend className="fieldset-legend text-black">Username</legend>
          <input
            type="username"
            required
            className="input bg-white text-xs outline outline-gray-200"
            placeholder="Input username"
            value={username}
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
            checked={isRemember}
            onChange={() => setIsRemember(isRemember ? false : true)}
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
