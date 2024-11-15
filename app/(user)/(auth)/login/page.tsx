"use client";

import { useState } from "react";
import { signIn } from "@/auth";
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
import { useSession } from "next-auth/react";
import Loader from "@/components/common/Loader";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        console.error(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-[350px] border-green-600">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full bg-green-600 hover:bg-blue-500">
            Log in
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
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
