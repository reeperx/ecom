"use client";

import React, { useState } from "react";
import { navBarList } from "@/constants/navbar";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname to get the current page URL
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession(); // Use session data
  const pathname = usePathname(); // Get the current pathname
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle the mobile menu
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center gap-8">
        {navBarList?.map((item) => (
          <Link
            key={item?.title}
            href={item?.link}
            className={`uppercase text-green-500 hover:text-blue-500 font-semibold duration-300 cursor-pointer ${
              pathname === item.link ? "text-blue-500" : ""
            }`}
          >
            {item?.title}
          </Link>
        ))}
        {session ? (
          <Link
            href={"/orders"}
            className={`uppercase bg-green-500 hover:bg-blue-500 text-white hover:text-white font-semibold duration-300 cursor-pointer ${buttonVariants({ size: "lg", variant: "outline" })}`}
          >
            Orders
          </Link>
        ) : (
          <Link
            href={"/login"}
            className={`uppercase bg-green-500 hover:bg-blue-500 text-white hover:text-white font-semibold duration-300 cursor-pointer ${buttonVariants({ size: "lg", variant: "outline" })}`}
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <Menu
        className="inline-flex md:hidden cursor-pointer text-green-600 hover:text-blue-500 w-9 h-9 duration-300"
        onClick={toggleMenu}
      />

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`fixed top-0 left-0 h-full w-2/3 bg-white bg-opacity-80 shadow-lg transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center p-4">
            <Logo /> {/* Logo */}
            <X className="cursor-pointer" onClick={toggleMenu} />
          </div>
          <div className="flex flex-col p-4 space-y-4">
            {navBarList?.map((item) => (
              <Link
                key={item?.title}
                href={item?.link}
                className={`uppercase text-green-500 hover:bg-green-500 hover:text-white rounded-md px-2 font-semibold duration-300 cursor-pointer ${
                  pathname === item.link ? "bg-green-500 text-white" : ""
                }`}
                onClick={toggleMenu} // Close menu on link click
              >
                {item?.title}
              </Link>
            ))}
            {session ? (
              <Link
                href={"/orders"}
                className={`uppercase text-green-500 hover:bg-green-500 hover:text-white rounded-md px-2 font-semibold duration-300 cursor-pointer ${
                  pathname === "/orders" ? "bg-green-500 text-white" : ""
                }`}
                onClick={toggleMenu} // Close menu on link click
              >
                Orders
              </Link>
            ) : (
              <Link
                href={"/login"}
                className={`uppercase text-green-500 hover:bg-green-500 hover:text-white rounded-md px-2 font-semibold duration-300 cursor-pointer ${
                  pathname === "/login" ? "bg-green-500 text-white" : ""
                }`}
                onClick={toggleMenu} // Close menu on link click
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
