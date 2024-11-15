import React from "react";
import Link from "next/link";
import SidebarCart from "@/components/SidebarCart";
import { User } from "lucide-react";
import { auth } from "@/auth";
import Image from "next/image";

const Sidebar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-60 right-2 z-20 flex flex-col gap-2">
      {/*user Account*/}
      <Link
        href={session?.user ? "/dashboard" : "/register"}
        className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-black justify-center items-center shadow-sm shadow-green-600 group overflow-hidden"
      >
        <div className="flex items-center justify-center">
          {session?.user ? (
            <Image
              src={session?.user?.image as string}
              alt="userImage"
              width={35}
              height={32}
              className="rounded-full -translate-x-12 group-hover:translate-x-4 transition-transform duration-200"
            />
          ) : (
            <User className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
          )}
          {session?.user ? (
            <Image
              src={session?.user?.image as string}
              alt="userImage"
              width={35}
              height={32}
              className="rounded-full -translate-x-4 group-hover:translate-x-12 transition-transform duration-200"
            />
          ) : (
            <User className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          )}
        </div>
        <p className="text-xs font-semibold">Profile</p>
      </Link>
      {/*Cart*/}
      <SidebarCart />
    </div>
  );
};
export default Sidebar;
