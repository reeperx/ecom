import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import bcrypt from "bcryptjs";
import { adminDB } from "@/firebaseAdmin";
import { sendWelcomeEmail } from "@/lib/nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        // Check if user already exists
        const existingUser = await adminDB.collection("accounts").where("email", "==", email).get();
        if (!existingUser.empty) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Create user with Admin SDK
        const userRecord = await getAuth().createUser({
            email,
            password,
            displayName: name,
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user info in Firestore
        await adminDB.collection("accounts").doc(userRecord.uid).set({
            name,
            email,
            password: hashedPassword,
        });

        await sendWelcomeEmail(email);

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
}