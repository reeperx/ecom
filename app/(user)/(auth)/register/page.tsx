"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Social from "@/components/Social";
import Loader from "@/components/common/Loader";
import { useSession } from "next-auth/react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  // Check if the session is loading
  if (status === "loading") {
    return <Loader />; // Optionally render a loading state
  }

  if (!session?.user) {
    redirect("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-[350px] border-green-600">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sign up
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-green-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-green-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-green-600"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-blue-500"
          >
            Sign up
          </Button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Social />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
