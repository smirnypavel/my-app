import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className=" text-red-600">Welcome to the Home Page</h1>
    </Layout>
  );
};

export default Home;
