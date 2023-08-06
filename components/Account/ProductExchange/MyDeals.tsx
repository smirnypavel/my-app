import axios from "axios";
import React, { useEffect, useState } from "react";
import { IDeals } from "../../../types/IDeals";
import MyDealsCard from "./MyDealsCard";
import styles from "../../../styles/components/Deals/DealsItemList.module.css";

const MyDeals = () => {
  const [post, setPost] = useState<IDeals[]>([]);

  useEffect(() => {
    const fetchMyDeals = async () => {
      try {
        const response = await axios.get("/orders");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchMyDeals();
  }, []);

  return (
    <>
      <div className={styles.statContainer}>
        <p>They MyDeals exchange</p>
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
          <h3>No exchange Deals</h3>
        )}
      </div>
    </>
  );
};

export default MyDeals;
