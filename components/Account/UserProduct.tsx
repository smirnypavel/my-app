import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../redux/posts/postsReducer";
import ItemCard from "../Product/ProductList/ProductCard";
import styles from "../../styles/components/ItemList.module.css";
import styles2 from "../../styles/components/Moderator/moderateProduct.module.css";

const UserProduct = () => {
  const [post, setPost] = useState<IPosts[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/posts/my");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className={styles2.statContainer}>
        <p>Список товаров на проверку</p>
        <div className={styles.itemList}>
          {post.map((item: { _id: React.Key | null | undefined }) => (
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
export default UserProduct;
