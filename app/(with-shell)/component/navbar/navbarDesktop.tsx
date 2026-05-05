import HomeIcon from "@/public/icons/homeIcon";
import NavbarLinks from "./links/navbarLinks";
import Link from "next/link";

export default function NavbarDesktop() {
  return (
    <header className="not-sm:hidden bg-transparent flex justify-between items-center h-20 sm:px-10 md:px-20 border-b-2 border-gray-200">
      <Link
        href="/dashboard"
        className="flex items-center space-x-2 text-xl px-3 py-2 bg-red-700 hover:underline rounded-sm text-white font-semibold"
      >
        <HomeIcon />
        <div>HRIS APIC</div>
      </Link>
      <div className="space-x-4">
        <NavbarLinks />
      </div>
    </header>
  );
}
