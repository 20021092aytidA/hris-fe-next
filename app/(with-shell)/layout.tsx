import React from "react";
import Footer from "./component/footer/footer";
import NavbarDesktop from "./component/navbar/navbarDesktop";
import NavbarMobile from "./component/navbar/navbarMobile";

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
      <div className="min-h-screen p-2 sm:p-4 sm:px-10 md:px-20 ">
        {children}
      </div>
      <Footer />
    </>
  );
}
