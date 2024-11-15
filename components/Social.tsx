"use client";

import React from "react";
import { Button } from "./ui/button";
import { FaGoogle, FaFacebook, FaTiktok } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "./common/Loader";

const Social = () => {
  const { data: session, status } = useSession();

  // Check if the session is loading
  if (status === "loading") {
    return <Loader />; // Optionally render a loading state
  }

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button variant="outline" onClick={() => signIn("google")}>
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button variant="outline" onClick={() => signIn("facebook")}>
        <FaFacebook className="h-5 w-5" />
      </Button>
      <Button variant="outline" onClick={() => signIn("tiktok")}>
        <FaTiktok className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
