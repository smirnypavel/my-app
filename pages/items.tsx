import React from "react";
import Layout from "../components/Layout/Layout";
import ItemList from "../components/ItemList/ItemList";
import styles from "../styles/components/ItemList.module.css";

const itemsData: never[] = [
  // Здесь можно добавить примеры данных для отображения
];

const ItemsPage: React.FC = () => {
  return (
    <Layout>
      <div className={styles.itemWrapper}>
        <h1>Items</h1>
        <ItemList items={itemsData} />
      </div>
    </Layout>
  );
};

export default ItemsPage;
