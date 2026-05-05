import BurgerIcon from "@/public/icons/burgerIcon";
import Link from "next/link";
import React from "react";
import { LinkList, LinkListType } from "./links/linkList";
import ProfileIcon from "@/public/icons/profileIcon";

export default function NavbarMobile() {
  return (
    <header className="sm:hidden h-15 bg-red-700 flex justify-between items-center px-5">
      <div className="drawer text-white">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <label htmlFor="my-drawer-1" className="cursor-pointer drawer-button">
          <BurgerIcon />
        </label>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu text-red-700 font-semibold bg-gray-200 min-h-full w-80 p-4">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            {LinkList.map((link: LinkListType, idx: number) => {
              return link.link ? (
                <li key={idx}>
                  <Link href={link.link}>{link.label}</Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="cursor-pointer text-white">
          <ProfileIcon />
        </div>
        <ul
          tabIndex={-1}
          className="mt-2 dropdown-content menu bg-gray-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <Link href="/login">Log out</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
