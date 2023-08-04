import React from "react";
import ProductCard from "./ProductCard";
import styles from "../../../styles/components/ItemList.module.css";
import { IPosts } from "../../../types/IPost";

interface ItemListProps {
  post: IPosts[];
}

export const ItemList: React.FC<ItemListProps> = ({ post }) => {
  if (!post || post.length === 0) {
    return <p>No posts found</p>; // Заглушка или сообщение об отсутствии данных
  }

  return (
    <div>
      <div className={styles.itemList}>
        {post.map((item) => (
          <ProductCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
