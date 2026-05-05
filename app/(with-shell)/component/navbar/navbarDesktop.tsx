import HomeIcon from "@/public/icons/homeIcon";
import NavbarLinks from "./links/navbarLinks";
import Link from "next/link";
import ProfileIcon from "@/public/icons/profileIcon";

export default function NavbarDesktop() {
  return (
    <header className="not-sm:hidden bg-transparent flex justify-between items-center h-20 sm:px-10 md:px-20 border-b-2 border-gray-200">
      <Link
        href="/dashboard"
        className="text-2xl px-3 py-2 hover:underline text-black font-semibold"
      >
        hris.<span className="text-red-700 font-bold">apic</span>
      </Link>
      <div className="flex items-center space-x-4">
        <NavbarLinks />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="cursor-pointer">
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
      </div>
    </header>
  );
}
