import React from 'react'
import {getBannersData} from "@/lib/getData";
import Container from "@/components/common/Container";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {BannerData} from "@/lib/type";
import FormattedPrice from './common/FormattedPrice';

const Banner = async () => {
    const banners = await getBannersData();
    const singleBanner = banners[0];

    return (
        <Container className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 md:max-h-[600px]">
            {/*Left side - single image*/}
            <div
                className="md:col-span-2 bg-gray-100 relative flex items-end justify-end rounded-lg overflow-hidden group">
                <div
                    className="h-full z-10 absolute left-10 top-0 flex flex-col justify-center gap-5 md:gap-10 items-start">
                    <div className="flex flex-col gap-1 md:gap-3">
                        <Button
                            className="bg-green-600 text-white w-20 font-medium hover:bg-blue-500 hoverEffect">Sale {singleBanner?.price}</Button>
                        <p className="text-xl md:text-3xl font-semibold">{singleBanner?.title}</p>
                        <h2 className="text-2xl md:text-5xl font-bold">{singleBanner?.subtitle}</h2>
                        <p className="text-xs md:text-sm text-black/60 font-medium max-w-[360px] line-clamp-6">{singleBanner?.description}</p>
                    </div>
                    <Link href={"/shop"}>
                        <Button className="bg-green-600 hover:text-white" size="lg">Shop Now</Button>
                    </Link>
                </div>
                <Image
                    src={urlFor(singleBanner?.image).url()}
                    alt={singleBanner?.title}
                    width={500}
                    height={500}
                    priority
                    className="object-contain h-72 md:h-full max-h-[600px] self-end group-hover:scale-105 hoverEffect"/>
            </div>
            {/*Right side - double image*/}
            <div className="flex flex-col space-y-5 md:space-y-10 h-auto md:max-h-[600px]">
                {banners.slice(1, 3).map((item: BannerData) => (
                    <div key={item?._id}
                         className="h-full md:h-1/2 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center p-5 group">
                        <div className="w-1/2 flex flex-col">
                            <div>
                                <p className="text-2xl font-semibold">{item?.title}</p>
                                <p className="sm:text-3xl text-2xl font-bold">{item?.subtitle}</p>
                            </div>
                            <p className="mt-3 font-medium text-black/60">From <FormattedPrice amount={item?.price}
                                                                                               className="font-bold text-green-600"/>
                            </p>
                            <Link href={"/shop"} className="mt-5">
                                <Button className="bg-green-600 hover:text-white" size="lg">Shop Now!</Button>
                            </Link>
                        </div>
                        <Image
                            src={urlFor(item?.image).url()}
                            alt={item?.title}
                            width={500}
                            height={500}
                            priority
                            className="object-contain h-72 md:h-60 w-1/2 group-hover:scale-105 hoverEffect"
                        />
                    </div>
                ))}
            </div>
        </Container>
    )
}
export default Banner
