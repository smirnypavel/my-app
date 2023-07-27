import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../../redux/posts/postsReducer";
import ItemCard from "../../Product/ProductList/ProductCard";
import styles from "../../../styles/components/ItemList.module.css";
import styles2 from "../../../styles/components/Moderator/moderateProduct.module.css";

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
    <>
      <div className={styles2.statContainer}>
        <p>They offer me an exchange</p>
        {post.length > 0 ? (
          <div className={styles.itemList}>
            {post.map((item: { _id: React.Key | null | undefined }) => (
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
    </>
  );
};

export default IExchangeList;
