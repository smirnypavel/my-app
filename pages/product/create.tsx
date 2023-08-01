import React from "react";
import Layout from "../../components/Layout/Layout";
import ItemForm from "../../components/Product/ProductForm/CreateProductForm";

const CreateItemPage: React.FC = () => {
  return (
    <Layout>
      <ItemForm />
    </Layout>
  );
};

export default CreateItemPage;
