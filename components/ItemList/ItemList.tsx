import React from "react";
import ItemCard from "./ItemCard";
import styles from "../../styles/components/ItemList.module.css";
import { IPosts } from "../../redux/posts/postsReducer";

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
          <ItemCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
