"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/lib/firebase";
import { ProductData } from "@/lib/type";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./product-ui";
import { Badge } from "./product-ui";
import FormattedPrice from "./common/FormattedPrice";
import { Button } from "./ui/button";
import { Eye, EyeOff, Trash2 } from "lucide-react"; // Added EyeOff icon
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

interface Order {
  id: string;
  value: {
    amount: number;
    items: ProductData[];
  };
}

const Orders = () => {
  const { data: session } = useSession();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const [ordersSnapshot, loading] = useCollection(
    session &&
      query(collection(db, "users", session?.user?.email as string, "orders"))
  );
  const orders = ordersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, "users", session?.user?.email as string, "orders", id)
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      toast.success("Order deleted successfully");
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      {loading ? (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full py-20 rounded-md shrink-o animate-pulse bg-green-100"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-5 flex-col">
          {orders?.length ? (
            orders?.map((item) => (
              <div key={item?.id}>
                <Card
                  className={
                    expandedOrderId === item.id ? "border-green-600/30" : ""
                  }
                >
                  <CardHeader>
                    <CardTitle>
                      Order ID:{" "}
                      <span className="text-base tracking-wide">
                        {item?.id.slice(-10)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-black/60">
                          Total Amount
                        </p>
                        <FormattedPrice
                          amount={item?.value?.amount}
                          className="text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black/60">
                          Payment Status
                        </p>
                        <Badge variant="success">Paid</Badge>
                      </div>
                      <Button
                        onClick={() => toggleDetails(item.id)}
                        className="flex items-center justify-center gap-2" // Added gap and flex classes
                      >
                        {expandedOrderId === item.id ? (
                          <EyeOff className="h-4 w-4" /> // Added EyeOff icon when details are shown
                        ) : (
                          <Eye className="h-4 w-4" /> // Adjusted Eye icon size
                        )}
                        {expandedOrderId === item.id
                          ? "Hide Details"
                          : "Show Details"}
                      </Button>
                      <Button
                        onClick={() => handleDeleteOrder(item?.id)}
                        variant={"destructive"}
                        className="flex items-center justify-center gap-2" // Added gap and flex classes
                      >
                        <Trash2 className="h-4 w-4" />{" "}
                        {/* Adjusted Trash2 icon size */}
                        Delete Order
                      </Button>
                    </div>
                  </CardContent>
                  <AnimatePresence>
                    {expandedOrderId === item?.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }} // Increased duration for slower animation
                      >
                        <Card className="border-0 border-t rounded-none">
                          <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-center">
                                    Price
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Quantity
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Sub Total
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {item?.value?.items?.map(
                                  (product: ProductData) => (
                                    <TableRow key={product?._id}>
                                      <TableCell>{product?.title}</TableCell>
                                      <TableCell className="text-center">
                                        <FormattedPrice
                                          amount={product?.price}
                                        />
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {product?.quantity}
                                      </TableCell>
                                      <TableCell className="text-right font-semibold">
                                        <FormattedPrice
                                          amount={
                                            product?.price * product?.quantity
                                          }
                                        />
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            ))
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center py-20"
            >
              <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-lg shadow-lg">
                <h1 className="text-xl font-bold uppercase">
                  Your order list is empty 😭
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  It&apos;s ready and waiting to be filled with exciting finds!
                  Give it a mission — add some goodies and let the adventure
                  begin!
                </p>
                <Link
                  href={"/shop"}
                  className="bg-green-600 text-white hover:bg-blue-500 hoverEffect px-8 py-3 rounded-lg font-semibold"
                >
                  Continue shopping
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
