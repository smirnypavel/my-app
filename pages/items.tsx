import React from "react";
import Layout from "../components/Layout/Layout";
import ItemList from "../components/ItemList/ItemList";
import SearchBar from "../components/SearchBar/SearchBar";

const ItemsPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <SearchBar />
        <ItemList />
      </div>
    </Layout>
  );
};

export default ItemsPage;
