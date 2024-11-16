import React from 'react'
import Link from "next/link";
import { FaPills } from "react-icons/fa";

const Logo = () => {
    return (
        <div>
            <Link href={"/"} className="flex justify-center items-center">
                <FaPills className='w-8 h-8 text-green-600 mr-2'/>
                <h2 className="uppercase space-x-2 sm:text-2xl text-lg sm:font-semibold font-medium">
                    <span className="hover:text-ceruleanBlue hoverEffect text-green-600">Ebenezer</span>
                    <span className="hover:text-limeGreen hoverEffect text-blue-500">Pharmacy</span>
                </h2>
            </Link>
        </div>
    )
}
export default Logo
