import React, { useEffect } from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import ItemList from "../components/ItemList/ItemList";
import SimpleSlider from "../components/Slider/Slider";

const Home: NextPage = () => {
  return (
    <Layout>
      <SimpleSlider />
      <ItemList />
    </Layout>
  );
};

export default Home;
