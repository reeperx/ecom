"use client";

import { ProductData } from "@/lib/type";
import { addQuantity, minusQuantity, removeFromCart } from "@/redux/slice";
import { urlFor } from "@/sanity/lib/image";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import FormattedPrice from "./common/FormattedPrice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button";

interface Props {
  cart: ProductData[];
  item: ProductData;
}

const CartItem = ({ cart, item }: Props) => {
  const dispatch = useDispatch();
  const [existingProduct, setExistingProduct] = useState<ProductData | null>(null);

  useEffect (() => {
    const availableProduct = cart?.find((product) => product?._id === item._id);
    if (availableProduct){
      setExistingProduct(availableProduct);
    }
  },[cart, item])

  const hundleMinus = () => {
    if ((existingProduct?.quantity as number) > 1) {
      dispatch(minusQuantity(item._id));
      toast.success("-1 Removed");
    } else {
      toast.error("Quantity can not be zero");
    }
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <Trash
          className="text-black hover:text-red-500 cursor-pointer hoverEffect duration300"
          onClick={() => {
            dispatch(removeFromCart(item?._id));
            toast.success(
              `${item?.title.substring(0, 20)} ... Deleted from cart`
            );
          }}
        />
        <Link href={`/product/${item?.slug.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt={item?.title}
            width={200}
            height={200}
            className="w-32 h-32 object-contain rounded-xl"
          />
        </Link>
        <h1 className="font-semibold">{item?.title.substring(0, 20)}</h1>
      </div>
      <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 px-4 md:py-0 lg:px-0">
        <p className="flex w-1/3 items-center text-lg font-semibold">
          <FormattedPrice amount={item?.price} />
        </p>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <Button
            className="w-6 h-6 text-sm flex items-center justify-center cursor-pointer hoverEffect rounded-md bg-transparent border-green-600 border-[1px] hover:bg-green-600 hover:text-white text-green-600"
            onClick={hundleMinus}
          >
            <FaMinus />
          </Button>
          <p className="text-sm font-semibold">{item?.quantity}</p>
          <Button
            className="w-6 h-6 text-sm flex items-center justify-center cursor-pointer hoverEffect rounded-md bg-transparent border-green-600 border-[1px] hover:bg-green-600 hover:text-white text-green-600"
            onClick={() => {
              dispatch(addQuantity(item?._id));
              toast.success("+1 Added");
            }}
          >
            <FaPlus />
          </Button>
        </div>
        <div className="w-1/3 flex items-center font-bold text-lg">
          <FormattedPrice amount={item?.quantity * item?.price} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
