import React from 'react'
import Link from "next/link";
import Image from "next/image"

const Logo = () => {
    return (
        <div>
            <Link href={"/"} className="flex justify-center items-center">
                <Image
                    src={"/logo.png"}
                    alt={"site logo"}
                    width={90}
                    height={90}
                    priority
                />
                <h2 className="uppercase space-x-2 sm:text-2xl text-lg sm:font-semibold font-medium">
                    <span className="hover:text-ceruleanBlue hoverEffect text-green-600">Ebenezer</span>
                    <span className="hover:text-limeGreen hoverEffect text-blue-500">Pharmacy</span>
                </h2>
            </Link>
        </div>
    )
}
export default Logo
