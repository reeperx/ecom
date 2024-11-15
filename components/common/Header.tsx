import React from 'react'
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Searchbar from "@/components/common/Searchbar";
import Navbar from "@/components/common/Navbar";

const Header = () => {
    return (
        <header className="w-full h-20 bg-white border-b-[1px] border-b-gray-300/50 sticky top-0 z-50 left-0">
            <Container className="h-full flex items-center justify-between gap-5 lg:gap-10">
                {/*Logo*/}
                <Logo/>
                {/*Searchbar*/}
                <Searchbar/>
                {/*Navbar*/}
                <Navbar/>
            </Container>
        </header>
    )
}
export default Header
