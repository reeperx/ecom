import React from 'react'
import Container from './Container'
import Link from 'next/link'
import { footerList } from '@/constants/footer'

const Footer = () => {
    return (
        <div className="bg-gray-100 py-5">
            <Container className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {footerList?.map((item) => (
                    <div key={item?._id}>
                        <h3 className="text-green-600 text-lg font-semibold mb-3 hover:text-blue-500">
                            {item?.title}
                        </h3>
                        <div className="flex flex-col gap-0.5">
                            {item?.listItem?.map((list) => list?.listData.map((data) => (
                                <Link href="/" key={data} className="py-1 text-black font-medium hover:text-blue-500 duration-300">
                                    {data}
                                </Link>
                            )))}
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default Footer