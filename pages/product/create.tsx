import React from "react";
import Layout from "../../components/Layout/Layout";
import ItemForm from "../../components/Product/ProductForm/ProductForm";

const CreateItemPage: React.FC = () => {
  return (
    <Layout>
      <h1>Create a New Product</h1>
      <ItemForm />
    </Layout>
  );
};

export default CreateItemPage;
