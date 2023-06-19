import React from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import ItemList from "../components/ItemList/ItemList";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Welcome to the Item Exchange App!</h1>
      <ItemList items={undefined} />
    </Layout>
  );
};

export default Home;
