import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../../types/IPost";
import ItemCard from "../../../components/Product/ProductList/ProductCard";
import styles from "../../../styles/components/ItemList.module.css";
import styles2 from "../../../styles/components/Moderator/moderateProduct.module.css";
import Layout from "../../../components/Layout/Layout";
import PrivateRoute from "../../../redux/PrivateRoute";
import AccountPage from "../../../components/Account/AcountPage";

const IExchangeList = () => {
  const [post, setPost] = useState<IPosts[]>([]);
  // const [isOfferPost, setIsOfferPost] = useState<IPosts[]>([]); // State to hold the filtered posts

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/posts/my-exchange");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <PrivateRoute>
      <Layout>
        <AccountPage>
          <div className={styles.itemListContainer}>
            <h1>I offered</h1>
            {post.length > 0 ? (
              <div className={styles.itemList}>
                {post.map((item: IPosts) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <h3>No exchange offers</h3>
            )}
          </div>
        </AccountPage>
      </Layout>
    </PrivateRoute>
  );
};

export default IExchangeList;
