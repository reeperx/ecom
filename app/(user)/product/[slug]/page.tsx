import React from 'react'
import Container from "@/components/common/Container";
import {groq} from "next-sanity";
import {ProductData} from "@/lib/type";
import {client} from "@/sanity/lib/client";
import {getBestSellersData} from "@/lib/getData";
import Image from "next/image"
import {urlFor} from "@/sanity/lib/image";
import FormattedPrice from "@/components/common/FormattedPrice";
import {MdStar} from "react-icons/md";
import CartButton from "@/components/common/CartButton";
import ProductsCard from "@/components/ProductsCard"


interface Props {
    params: Promise<{ slug: string }>
}

const SingleProductPage = async ({params}: Props) => {
    const {slug} = await params;
    const query = groq`*[_type == "product" && slug.current == $slug][0]{ ... }`;
    const product: ProductData = await client.fetch(query, {slug});

    const bestSellersData: ProductData[] = await getBestSellersData();

    return (
        <Container className="my-10 bg-gray-100 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full p-4">
                <div className="h-full xl:col-span-2">
                    <Image
                        src={urlFor(product?.image).url()}
                        alt={product?.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>
                <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-4xl font-semibold">
                            {product?.title}
                        </h2>
                        <div className="flex items-center gap-4">
                            <p className="text-lg font-normal text-gray-500 line-through">
                                <FormattedPrice amount={product?.rowprice} className="text-lg font-bold text-gray-400"/>
                            </p>
                            <FormattedPrice amount={product.price} className="text-lg font-bold text-green-600"/>
                            <p className="text-sm">you saved{" "}
                                <FormattedPrice amount={product?.rowprice - product?.price}
                                                className="bg-green-600 text-white px-2 rounded-md text-xs py-1"/>{" "}
                                from this item
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-base text-gray-600 flex items-center">
                                {Array?.from({length: 5}).map((_, index) => {
                                    const filled = index + 1 <= Math.floor(product.ratings || 0);
                                    const halfFilled = index + 1 > Math.floor(product.ratings || 0) && index < Math.ceil(product.ratings || 0);
                                    return (
                                        <MdStar key={index}
                                                className={`${filled ? "text-[#fa8900]" : halfFilled ? "text-yellow-200" : "text-gray-600"}`}/>
                                    );
                                })}
                            </div>
                            <p className="text-sm font-semibold text-black/60 tracking-wide ">
                                {`(12 customers review)`}
                            </p>
                        </div>
                        <p className="text-sm tracking-wide text-gray-600">
                            {product?.description}
                        </p>
                        <p className="text-sm text-gray-500">Be the first to leave a review</p>
                        <CartButton item={product} className="rounded-md"/>
                        <p className="font-normal text-sm">
                            <span className="text-base font-semibold">Categories:</span>Pain Killers, Pills, Discount, SKU: 1042457
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {bestSellersData?.map((item) => (
                    <ProductsCard key={item._id} item={item}/>
                ))}
            </div>
        </Container>
    )
}
export default SingleProductPage
