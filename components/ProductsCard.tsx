import React from "react";
import { ProductData } from "@/lib/type";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MdStar } from "react-icons/md";
import FormattedPrice from "@/components/common/FormattedPrice";
import CartButton from "@/components/common/CartButton";

const ProductsCard = ({ item }: { item: ProductData }) => {
  return (
    <div className="relative group overflow-hidden">
      <Card className="border-green-600 h-full flex flex-col">
        <CardContent className="p-4 flex-grow">
          <div className="overflow-hidden mb-4">
            <Link href={`/product/${item?.slug.current}`}>
              <Image
                src={urlFor(item?.image).url()}
                alt={item?._type}
                width={500}
                height={300}
                loading={"lazy"}
                className="w-full h-48 object-cover group-hover:scale-105 hoverEffect"
              />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center">
              {Array?.from({ length: 5 })?.map((_, index) => {
                const filled = index + 1 <= Math.floor(item?.ratings);
                const halfFilled =
                  index + 1 > Math.floor(item?.ratings) &&
                  index < Math.ceil(item?.ratings);

                return (
                  <MdStar
                    key={index}
                    className={`${
                      filled
                        ? "text-[#fa8900]"
                        : halfFilled
                          ? "text-yellow-200"
                          : "text-gray-300"
                    } text-lg`}
                  />
                );
              })}
            </div>
            <p className="uppercase text-xs font-medium text-green-600">
              {item?.brand}
            </p>
            <h2 className="text-sm font-semibold text-black line-clamp-1 text-center">
              {item?.title}
            </h2>
            <p className="text-center text-xs line-clamp-2 text-gray-600">
              {item?.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <FormattedPrice
                amount={item?.rowprice}
                className="text-xs text-gray-500 line-through"
              />
              <FormattedPrice
                amount={item?.price}
                className="text-sm text-green-600 font-bold"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <CartButton item={item} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductsCard;
