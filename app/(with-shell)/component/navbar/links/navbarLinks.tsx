"use client";

import Link from "next/link";
import { LinkList, LinkListType } from "./linkList";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarLinks() {
  const nav = usePathname();
  const [currLink, setCurrLink] = useState<string>("");

  useEffect(() => {
    const tempLink = nav.split("/")[nav.split("/").length - 1];
    setCurrLink(tempLink);
  }, [nav]);

  return (
    <>
      {LinkList.map((link: LinkListType, idx: number) => {
        return link.link ? (
          <Link
            key={idx}
            href={link.link}
            className={`${currLink === link.label.toLowerCase() ? "underline" : ""} hover:underline font-semibold`}
          >
            {link.label}
          </Link>
        ) : null;
      })}
    </>
  );
}
