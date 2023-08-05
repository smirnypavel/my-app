import React, { useState } from "react";
import Image from "next/image";
import { MdCompareArrows } from "react-icons/md";
import styles from "../../../styles/components/ItemList.module.css";
import productNotFound from "../../../public/productNotFound.jpeg";

import { IDeals } from "../../../types/IDeals";

interface MyDealsCardProps {
  item: IDeals; // Assuming you have an Item type defined
}

const MyDealsCard: React.FC<MyDealsCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setCurrentOfferIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const productPhoto = item.product.img || productNotFound;
  const offerPhoto = item.offer.img || productNotFound;

  return (
    <>
      <div className={styles.itemCard}>
        <Image
          src={productPhoto}
          alt=""
          width={150}
          height={150}
          style={{
            objectFit: "cover",
            margin: "auto",
          }}
          priority
        />
        <h3 className={styles.cardTitle}>{item.product.title}</h3>
      </div>
      <MdCompareArrows style={{ fontSize: "60px" }} />
      <div className={styles.itemCard}>
        <Image
          src={offerPhoto}
          alt=""
          width={150}
          height={150}
          style={{
            objectFit: "cover",
            margin: "auto",
          }}
          priority
        />
        <h3 className={styles.cardTitle}>{item.offer.title}</h3>
      </div>
    </>
  );
};

export default MyDealsCard;
