import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Container from "@/components/common/Container";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  // If the user is authenticated, redirect them to the home page
  if (session?.user) {
    redirect("/"); // This will cause a redirect
  }

  return (
    <Container className="py-10 flex flex-col items-center justify-center">
      {children}
    </Container>
  );
};
export default AuthLayout;
