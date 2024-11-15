import React from 'react'
import Container from "@/components/common/Container";
import ProductList from "@/components/ProductList";

const ShopPage = () => {
    return (
        <Container className="py-5">
            <h2 className="text-2xl font-semibole mb-5">All available product list</h2>
            <ProductList />
        </Container>
    )
}
export default ShopPage
