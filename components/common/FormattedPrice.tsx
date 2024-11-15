import React from 'react'
import {cn} from "@/lib/utils";

interface Props {
    amount: number;
    className?: string;
}

const FormattedPrice = ({ amount, className }: Props) => {
    const priceFormat = new Number(amount).toLocaleString("en-ZA", {
        style: "currency",
        currency: "ZAR",
        minimumFractionDigits: 2,
    });

    return (
        <span className={cn("text-base font-semibold", className)}>
        {priceFormat}
    </span>
    )
}
export default FormattedPrice
