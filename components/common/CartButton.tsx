"use client";

import React from 'react'
import {ProductData} from "@/lib/type";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import { useDispatch } from "react-redux"
import {addToCart } from "@/redux/slice";
import {toast} from "sonner";

interface Props {
    item: ProductData;
    className?: string;
}
const CartButton = ({ item, className } : Props) => {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart(item));
        toast.success(`${item?.title.substring(0, 12)} added successfully`)
    }
    return (
        <Button
            onClick={handleAddToCart}
            className={cn("bg-green-600 w-full text-white border border-px border-green-600 hover:bg-blue-500 hover:border-blue-500 hoverEffect tracking-wide flex items-center justify-center gap-1 font-semibold", className)}>Add to Cart</Button>
    )
}
export default CartButton
