"use client";

import { StoreState } from "@/lib/type";
import { resetCart } from "@/redux/slice";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./common/Loader";
import { HiCheckCircle } from "react-icons/hi";
import Link from "next/link";
import { Button } from "./ui/button";
import { Home, Info, Mail } from "lucide-react";
import { toast } from "sonner";

const SuccessContainer = ({ id }: { id: string }) => {
  const { cart } = useSelector((state: StoreState) => state?.ebenezer);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let price = 0;
    cart.map((item) => {
      price += item?.price * item?.quantity;
      return price;
    });
    setTotalAmount(price);
  }, [cart]);

  const handleSaveOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/saveorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          email: session?.user?.email as string,
          id: id,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (data?.success) {
        setLoading(false);
        dispatch(resetCart());
        toast.success(data?.message)
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user && cart?.length) {
      handleSaveOrder();
    }
  }, [session?.user, cart?.length]);

  return (
    <div>
      {loading ? (
        <Loader title="Processing your order..." subtitle="Please do not close or leave this window" />
      ) : (
        <div className="bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-28">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="relative">
              <div className="absolute flex inset-0 items-center justify-center">
                <div className="w-32 h-32 bg-green-100 rounded-full"></div>
              </div>
              <div className="relative">
                <HiCheckCircle className="mx-auto h-24 w-24 text-green-500" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Success!
            </h2>
            <p className="text-sm mt-2 text-gray-600">
              Your payment has been completed successfully
            </p>
            <div className="mt-8 space-y-6">
              <p className="text-base text-gray-700">
                Thank you for your purchase. We&apos;ve received your order and
                will process it shortly. You should receive a confirmation email
                within the next few minutes
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={"/"}>
                  <Button className="inline-flex items-center bg-green-600 hover:bg-blue-500 transition duration-300 text-white font-semibold shadow-md ease-in-out transform hover:-translate-y-1">
                    <Home className="mr-2 h-5 w-5" /> Home
                  </Button>
                </Link>
                <Link href={"/orders"}>
                  <Button className="inline-flex items-center bg-blue-500 hover:bg-green-600 transition duration-300 text-white font-semibold shadow-md ease-in-out transform hover:-translate-y-1">
                    <Info className="mr-2 h-5 w-5" /> Orders
                  </Button>
                </Link>
                <Link href={"/contact"}>
                  <Button className="inline-flex items-center bg-purple-600 hover:bg-orange-500 transition duration-300 text-white font-semibold shadow-md ease-in-out transform hover:-translate-y-1">
                    <Mail className="mr-2 h-5 w-5" /> Contact
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-10">
                <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessContainer;
