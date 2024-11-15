import React from 'react'
import {Rocket, RotateCcw, CreditCard, Headphones} from 'lucide-react'

const data = [
    {
        title: "Free Delivery",
        description: "Orders above R350",
        icon: Rocket
    },
    {
        title: "60 Days Return",
        description: "Money back if not satisfied",
        icon: RotateCcw
    },
    {
        title: "Secure Payment",
        description: "100% Secure payment",
        icon: CreditCard
    },
    {
        title: "Support 24/7",
        description: "Dedicated support",
        icon: Headphones
    }
]

const Facilities = () => {
    return (
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 ">
            {data?.map((item) => (
                <div key={item?.title} className="flex flex-col sm:flex-row items-center gap-3">
                    <span className="text-3xl text-green-600"><item.icon className="h-8 w-8" /></span>
                    <div className="text-center sm:text-left">
                        <h2 className="uppercase font-bold">{item?.title}</h2>
                        <p className="text-sm text-black/60">{item?.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Facilities
