import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

type AdminNewProductProps = {};

const AdminNewProduct: React.FC<AdminNewProductProps> = () => {
  return (
    <>
      <PageHeader>New Product</PageHeader>
      <ProductForm />
    </>
  );
};
export default AdminNewProduct;
