import React from "react";
import ItemCard from "./ItemCard";
import styles from "../../styles/components/ItemList.module.css";

interface ItemListProps {
  items: any;
  //   items: Item[]; // Assuming you have an Item type defined
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className={styles.itemList}>
      <p>ItemList</p>
      {/* {items.map((item: { id: React.Key | null | undefined }) => (
        <ItemCard
          key={item.id}
          item={item}
        />
      ))} */}
    </div>
  );
};

export default ItemList;
