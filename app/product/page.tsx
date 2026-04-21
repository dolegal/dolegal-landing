import type { Metadata } from "next";
import { BodyClass } from "./_components/BodyClass";
import { ProductWorkspace } from "./_components/ProductWorkspace";

export const metadata: Metadata = {
  title: "DoLegal · Research workspace",
};

export default function ProductPage() {
  return (
    <>
      <BodyClass className="product-body" />
      <ProductWorkspace />
    </>
  );
}
