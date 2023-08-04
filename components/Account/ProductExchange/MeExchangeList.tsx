import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../../types/IPost";
import styles from "../../../styles/components/ItemList.module.css";
import styles2 from "../../../styles/components/Moderator/moderateProduct.module.css";
import CardExchange from "./CardExchange";

const MeExchangeList = () => {
  const [post, setPost] = useState<IPosts[]>([]);
  const [isOfferPost, setIsOfferPost] = useState<IPosts[]>([]); // State to hold the filtered posts

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/posts/my");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProduct();
  }, []);

  // Filter the posts and set the filtered result to isOfferPost state
  useEffect(() => {
    setIsOfferPost(
      post.filter((item) => item.toExchange && item.toExchange.length > 0)
    );
  }, [post]);

  return (
    <>
      <div className={styles2.statContainer}>
        <p>They offer me an exchange</p>
        {isOfferPost.length > 0 ? (
          <div className={styles.itemList}>
            {isOfferPost.map((item: IPosts) => (
              <CardExchange
                key={item._id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <h3>No exchange offers</h3>
        )}
      </div>
    </>
  );
};

export default MeExchangeList;
