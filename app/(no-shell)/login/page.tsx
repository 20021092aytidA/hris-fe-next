import React from "react";
import LoginForm from "./component/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <div>
        <div className="flex items-start">
          <div className="text-7xl">
            hris.<span className="text-red-600">apic</span>
          </div>
          <div>LOGIN</div>
        </div>
        <div className="rounded-sm shadow-md p-4 bg-white">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
