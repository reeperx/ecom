"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ProductData } from "@/lib/type";
import useDebounce from "@/hooks/useDebounce";
import { getProductsData } from "@/lib/getData";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      if (debouncedSearch.trim() !== "") {
        setLoading(true);
        try {
          const productsData = await getProductsData();
          const filteredProducts = productsData.filter((item: ProductData) =>
            item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
          );
          setSearchResults(filteredProducts);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  const handleClearSearch = () => {
    setSearch("");
    setSearchResults([]);
  };

  const handleResultClick = (item: ProductData) => {
    router.push(`/product/${item?.slug.current}`); // Adjust the URL as per your routing structure
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="w-full hidden md:inline-flex flex-1 h-12 text-base items-center justify-center relative">
        <Search className="absolute left-1.5 mt-0.5 text-green-600" />
        <Input
          type="text"
          placeholder="Search Products..."
          className="flex-1 h-full outline-none bg-transparent placeholder-text-gray-300 border-[1px] border-green-600 rounded-md pl-8 pr-28"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {search && (
          <X
            onClick={handleClearSearch}
            className="text-green-600 hover:text-blue-500 cursor-pointer absolute right-24 text-sm"
          />
        )}
        <Button className="bg-green-600 text-gray-50 absolute right-0 mr-1.5">
          Search
        </Button>
      </div>

      {/* Loader */}
      {loading && (
        <div
          className="absolute left-0 mt-2 flex justify-center items-center"
          style={{
            width: "100%",
          }}
        >
          <Loader2 className="animate-spin text-green-600" />
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div
          className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-md rounded-md shadow-md border border-green-600 z-50"
          style={{
            width: "100%", // Matches the width of the search bar
          }}
        >
          {searchResults.map((item: ProductData) => (
            <div
              key={item?._id}
              className="flex items-center p-2 hover:bg-green-50 cursor-pointer"
              onClick={() => handleResultClick(item)}
            >
              <Image
                src={urlFor(item?.image).url()}
                alt={item?._type}
                width={20}
                height={20}
                className="w-10 h-10 object-cover rounded-md mr-2"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {item?.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-1">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
