"use client";

import React from 'react'
import Link from "next/link";
import {ShoppingBasket} from "lucide-react";
import { useSelector } from "react-redux"
import {StoreState} from "@/lib/type";

const SidebarCart = () => {
    const {cart} = useSelector((state: StoreState) => state?.ebenezer);

    return (
        <div>
            <Link href={"/cart"} className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-black justify-center items-center shadow-sm shadow-green-600 group overflow-hidden relative">
                <div className="flex items-center justify-center">
                    <ShoppingBasket className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200"/>
                    <ShoppingBasket className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200"/>
                </div>
                <p className="text-xs font-semibold">Buy Now</p>
                <p className="absolute top-1 right-2 bg-green-600 text-white text-xs w-4 h-4 rounded-full flex font-semibold justify-center items-center">
                    {cart ? cart?.length : 0}
                </p>
            </Link>
        </div>
    )
}
export default SidebarCart
