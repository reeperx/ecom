import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      return NextResponse.json({ message: result.error }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}