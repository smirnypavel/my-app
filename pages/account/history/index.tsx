import axios from "axios";
import React, { useEffect, useState } from "react";
import { IDeals } from "../../../types/IDeals";
import MyDealsCard from "../../../components/Account/ProductExchange/MyDealsCard";
import styles from "../../../styles/components/Deals/DealsItemList.module.css";
import Layout from "../../../components/Layout/Layout";
import PrivateRoute from "../../../redux/PrivateRoute";
import AccountPage from "../../../components/Account/AcountPage";

const MyHistory = () => {
  const [post, setPost] = useState<IDeals[]>([]);

  useEffect(() => {
    const fetchMyDeals = async () => {
      try {
        const response = await axios.get("/orders/orders-arhive");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchMyDeals();
  }, []);

  return (
    <PrivateRoute>
      <Layout>
        <AccountPage>
          <div className={styles.statContainer}>
            <h1>Transaction history</h1>
            {post.length > 0 ? (
              <div className={styles.itemList}>
                {post.map((item: IDeals) => (
                  <MyDealsCard
                    key={item._id}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <h3>No transactions in history</h3>
            )}
          </div>
        </AccountPage>
      </Layout>
    </PrivateRoute>
  );
};

export default MyHistory;
