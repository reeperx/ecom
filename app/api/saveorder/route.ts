import { adminDB } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();

        const { cart, email, id, totalAmount } = await reqBody;

        const orderItem = {
            amount: totalAmount,
            items: cart || [],
        }

        if (cart.length) {
            const userOrdersRef = adminDB.collection("users").doc(email).collection("orders").doc(id);
            const userDoc = await userOrdersRef.get();

            if (!userDoc?.exists) {
                await userOrdersRef.set({ email })
            }

            await userOrdersRef.set({ value: orderItem }, { merge: true })
        }

        return NextResponse.json({
            success: true,
            message: "Order saved successfully"
        },
            {
                status: 201
            })

    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 })
    }
}