import Link from 'next/link'
import React from 'react'
import {MoveLeft} from "lucide-react";
import Logo from "@/components/common/Logo";

const StudioHeader = (props : any ) => {
    return (
        <div>
            <div className="p-5 bg-white text-green-600 flex items-center justify-between">
                <Link href={"/"} className="flex items-center gap-3 font-semibold hover:text-blue-500 duration-300">
                    <MoveLeft className="text-4xl"/> Go to Homepage
                </Link>
                <Logo />
                <p className="hidden md:inline-flex text-4xl uppercase font-semibold">Admin Panel</p>
            </div>
            {props.renderDefault(props)}
        </div>
    )
}
export default StudioHeader
