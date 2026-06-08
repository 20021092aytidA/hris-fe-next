"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  type ErrorMessage = {
    errUser: string;
    errPass: string;
  };

  const nav = useRouter();
  const [username, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [errMsg, setErrMsg] = useState<ErrorMessage>({
    errUser: "",
    errPass: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearField = () => {
    setErrMsg({
      errUser: "",
      errPass: "",
    });
  };

  const handleBtnClick = async (): Promise<void> => {
    setIsLoading(true);
    if (validateForm()) {
      await handleLogin();
    }

    setIsLoading(false);
  };

  const handleLogin = async (): Promise<void> => {
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
          alert("login failed!, wrong credentials!");
          break;

        case 401:
          alert("login failed!, wrong credentials!");
          break;

        default:
          alert("login failed, unknown error occured!\ntry again later.");
          break;
      }
    } catch (error) {
      alert("login failed, unknown error occured!\ntry again later.");
    }
  };

  const validateForm = (): boolean => {
    clearField();

    let isValid: boolean = true;

    if (username.length === 0) {
      console.log(username.length);
      isValid = false;
      // setErrMsg({ ...errMsg, errUser: "must be filled!" });
      setErrMsg((prev) => ({ ...prev, errUser: "username must be filled!" }));
    }

    if (pass.length === 0) {
      isValid = false;
      // setErrMsg({ ...errMsg, errPass: "must be filled!" });
      setErrMsg((prev) => ({ ...prev, errPass: "password must be filled!" }));
    }

    return isValid;
  };

  useEffect(() => {
    clearField();
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <fieldset className="col-span-6 sm:col-span-3 fieldset mb-2">
          <legend className="fieldset-legend text-black">Username</legend>
          <input
            type="username"
            required
            className="input bg-white text-xs outline outline-gray-200 w-full"
            placeholder="Input username"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errMsg.errUser.length !== 0 ? (
            <div className="text-red-600 text-right text-xs font-normal">
              {errMsg.errUser}
            </div>
          ) : null}
        </fieldset>
        <fieldset className="col-span-6 sm:col-span-3 fieldset">
          <legend className="fieldset-legend text-black">Password</legend>
          <input
            type="password"
            required
            className="input bg-white text-xs outline outline-gray-200 w-full"
            placeholder="Input password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {errMsg.errPass.length !== 0 ? (
            <div className="text-red-600 text-right text-xs font-normal">
              {errMsg.errPass}
            </div>
          ) : null}
        </fieldset>
      </div>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 font-semibold hover:underline text-white bg-red-700! hover:bg-red-800! rounded-sm cursor-pointer text-sm shadow-md"
          onClick={handleBtnClick}
          disabled={isLoading}
        >
          login
        </button>
      </div>
    </>
  );
}
