import React from "react";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";
import db from "@/db/db";
import { notFound } from "next/navigation";

type AdminEditProductProps = {
  params: {
    id: string;
  };
};

const AdminEditProduct: React.FC<AdminEditProductProps> = async ({ params: { id } }) => {
  const product = await db.product.findUnique({ where: { id } });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
};
export default AdminEditProduct;
