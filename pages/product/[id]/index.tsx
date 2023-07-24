import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { ProductDetail } from "../../../components/Product/ProductList/ProductDetail";

const ItemDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await axios.patch(`/posts/view/${id}`);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchViews();
  }, []);

  return (
    <Layout>
      <ProductDetail productId={id as string} />
    </Layout>
  );
};

export default ItemDetailsPage;
