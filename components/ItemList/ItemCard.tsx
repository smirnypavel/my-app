import React from "react";
import styles from "../../styles/components/ItemList.module.css";

interface ItemCardProps {
  item: any; // Assuming you have an Item type defined
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className={styles.itemCard}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      {/* Additional item details */}
    </div>
  );
};

export default ItemCard;
