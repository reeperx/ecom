import React from "react";
import Container from "@/components/common/Container";

const AuthLayout =  ({ children }: { children: React.ReactNode }) => {

  return (
    <Container className="py-10 flex flex-col items-center justify-center">
      {children}
    </Container>
  );
};
export default AuthLayout;
