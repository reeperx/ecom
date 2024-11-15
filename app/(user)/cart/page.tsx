
import { auth } from "@/auth";
import CartContainer from "@/components/CartContainer";
import Container from "@/components/common/Container";
import React from "react";

const CartPage = async () => {
  const session = await auth();

  return (
    <Container className="py-10">
      <CartContainer initialSession={session} />
    </Container>
  );
};

export default CartPage;
