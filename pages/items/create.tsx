import React from "react";
import Layout from "../../components/Layout/Layout";
import ItemForm from "../../components/ItemForm/ItemForm";

const CreateItemPage: React.FC = () => {
  return (
    <Layout>
      <h1>Create a New Item</h1>
      <ItemForm />
    </Layout>
  );
};

export default CreateItemPage;
