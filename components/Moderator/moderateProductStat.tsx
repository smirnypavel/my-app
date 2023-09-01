import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../types/IPost";
import styles from "../../styles/components/ItemList.module.css";
import styles2 from "../../styles/components/Moderator/moderateProduct.module.css";
import ItemCard from "../Product/ProductList/ProductCard";

const ModerateProduct = () => {
  const [post, setPost] = useState<IPosts[]>([]);
  useEffect(() => {
    const fetchPostAll = async () => {
      try {
        const response = await axios.get("/posts/all");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchPostAll();
  }, []);
  return (
    <>
      <div className={styles2.statContainer}>
        <p>Список товаров на проверку</p>
        <div className={styles.itemList}>
          {post.map((item: IPosts) => (
            <ItemCard
              key={item._id}
              item={item}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default ModerateProduct;
