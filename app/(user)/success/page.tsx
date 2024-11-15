import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: Promise<{ session_id?: string | null}>;
}
const SuccessPage = async ({ searchParams }: Props) => {
  const awaitedSearchParams = await searchParams;
  const id = awaitedSearchParams?.session_id;

  if (!id) {
    redirect("/");
  }

  return (
    <div>
      <SuccessContainer id={id} />
    </div>
  );
};

export default SuccessPage;
