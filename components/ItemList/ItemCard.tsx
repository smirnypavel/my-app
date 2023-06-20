import React from "react";
import Image from "next/image";
import styles from "../../styles/components/ItemList.module.css";

interface ItemCardProps {
  item: any; // Assuming you have an Item type defined
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className={styles.itemCard}>
      <h3>{item.title}</h3>
      <Image
        src={item.image}
        alt=""
        width={150}
        height={150}
      />
      {/* Additional item details */}
    </div>
  );
};

export default ItemCard;
