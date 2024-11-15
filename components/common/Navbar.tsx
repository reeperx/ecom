import React from 'react'
import {navBarList} from "@/constants/navbar";
import Link from "next/link";
import { Menu } from 'lucide-react';

const Navbar = () => {
    return (
        <div>
            <div className="hidden md:flex items-center gap-8">
                {navBarList?.map((item) => (
                    <Link key={item?.title} href={item?.link}
                          className="uppercase text-green-500 hover:text-blue-500 font-semibold duration-300 cursor-pointer">
                        {item?.title}
                    </Link>
                ))}
                <Link href={"/orders"}
                      className="uppercase text-green-500 hover:text-blue-500 font-semibold duration-300 cursor-pointer">
                    Orders
                </Link>
                <Link href={"/login"}
                      className="uppercase text-green-500 hover:text-blue-500 font-semibold duration-300 cursor-pointer">
                    Login
                </Link>
            </div>
            <Menu className="inline-flex md:hidden cursor-pointer text-green-600 hover:text-blue-500 w-9 h-9 duration-300"/>
        </div>
    )
}
export default Navbar
