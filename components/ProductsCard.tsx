import React from 'react'
import {ProductData} from "@/lib/type";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image"
import {urlFor} from "@/sanity/lib/image";
import { MdStar } from 'react-icons/md'
import FormattedPrice from "@/components/common/FormattedPrice";
import CartButton from "@/components/common/CartButton";

const ProductsCard = ({item}: { item: ProductData }) => {
    return (
        <div className="relative group overflow-hidden">
            <Card className="border-green-600">
                <CardContent>
                    <div className="overflow-hidden">
                        <Link href={`/product/${item?.slug.current}`}>
                            <Image src={urlFor(item?.image).url()} alt={item?._type} width={500} height={500} loading={"lazy"}
                                   className="w-full h-72 object-cover group-hover:scale-105 hoverEffect"/>
                        </Link>
                    </div>
                    <div className="px-6 flex flex-col items-center gap-2">
                        <div className="text-base text-gray-100 flex items-center mt-6">
                            {Array?.from({length: 5})?.map((_, index) => {
                                const filled = index + 1 <= Math.floor(item?.ratings);
                                const halfFilled = index + 1 > Math.floor(item?.ratings) && index < Math.ceil(item?.ratings);

                                return (
                                    <MdStar key={index} className={`${filled ? "text-[#fa8900]": halfFilled ? "text-yellow-200" : "text-gray-600"}`}/>
                                )
                            })}
                        </div>
                        <p className="uppercase text-xs font-medium text-green-600">
                            {item?.brand}
                        </p>
                        <h2 className="text-base font-semibold text-black line-clamp-1">
                            {item?.title}
                        </h2>
                        <p className="text-center text-sm line-clamp-2">
                            {item?.description}
                        </p>
                        <div className="flex items-center gap-3 mb-2">
                            <FormattedPrice amount={item?.rowprice} className="text-gray-600 line-through"/>
                            <FormattedPrice amount={item?.price} className="text-green-600 font-bold"/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <CartButton item={item}/>
                </CardFooter>
            </Card>
        </div>
    )
}
export default ProductsCard
