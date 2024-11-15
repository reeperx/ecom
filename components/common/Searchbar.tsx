"use client";

import React, {useState} from 'react'
import {Input} from '../ui/input'
import {Search, X} from 'lucide-react'
import {Button} from '../ui/button'

const Searchbar = () => {
    const [search, setSearch] = useState('');

    return (
        <>
            <div className="w-full hidden md:inline-flex flex-1 h-12 text-base items-center justify-center relative">
                <Search className="absolute left-1.5 mt-0.5 text-green-600"/>
                <Input
                    type="text"
                    placeholder="Search Products..."
                    className="flex-1 h-full outline-none bg-transparent placeholder-text-gray-300 border-[1px] border-green-600 rounded-md pl-8 pr-28"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}/>
                {search && <X onClick={() => setSearch("")} className="text-green-600 hover:text-blue-500 cursor-pointer absolute right-24 text-sm"/>}
                <Button className="bg-green-600 text-gray-50 absolute right-0 mr-1.5">Search</Button>
            </div>
        </>
    )
}
export default Searchbar
