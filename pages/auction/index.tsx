import React from "react";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";

const Auction = () => {
  return (
    <Layout>
      <p>Auction</p>
      <Link href={""}>Add Auction</Link>
    </Layout>
  );
};

export default Auction;
