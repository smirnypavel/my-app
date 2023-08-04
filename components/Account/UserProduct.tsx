import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../types/IPost";
import ItemCard from "../Product/ProductList/ProductCard";
import styles from "../../styles/components/ItemList.module.css";
import styles2 from "../../styles/components/Moderator/moderateProduct.module.css";

const UserProduct = () => {
  const [post, setPost] = useState<IPosts[]>([]);
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

  return (
    <>
      {/* <div className={styles2.statContainer}> */}
      {/* <p>Список моих товаров</p> */}
      <div className={styles.itemList}>
        {post.map((item: IPosts) => (
          <ItemCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
      {/* </div> */}
    </>
  );
};
export default UserProduct;
