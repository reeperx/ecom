import React from 'react'
import {ProductData} from "@/lib/type";
import {getProductsData} from "@/lib/getData";
import ProductsCard from "@/components/ProductsCard";

const ProductList = async () => {
    const products: ProductData[] =await getProductsData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products?.map((item) => (
                <ProductsCard key={item?._id} item={item}/>
            ))}
        </div>
    )
}
export default ProductList
