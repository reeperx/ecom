import { NextRequest, NextResponse } from "next/server"
import { adminDB } from "@/firebaseAdmin"
import { getAuth } from "firebase-admin/auth"
import bcrypt from "bcryptjs"

export const runtime = 'nodejs' // Mark this route as Node.js runtime

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            )
        }

        const userRecord = await getAuth().getUserByEmail(email)
        const userDoc = await adminDB.collection("accounts").doc(userRecord.uid).get()
        const userData = userDoc.data()

        if (!userData) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            )
        }

        return NextResponse.json({
            id: userRecord.uid,
            email: userRecord.email,
            name: userRecord.displayName,
        })
    } catch (error) {
        console.error("Error verifying credentials:", error)
        return NextResponse.json(
            { message: "Authentication failed" },
            { status: 500 }
        )
    }
}