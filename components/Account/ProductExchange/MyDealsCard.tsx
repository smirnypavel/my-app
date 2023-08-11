import React, { useState } from "react";
import Image from "next/image";
import { MdCompareArrows } from "react-icons/md";
import styles from "../../../styles/components/Deals/DealsCard.module.css";
import productNotFound from "../../../public/productNotFound.jpeg";

import { IDeals } from "../../../types/IDeals";
import Link from "next/link";

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
        <Link
          className={styles.linkToDeal}
          href="/deal/[id]"
          as={`/deal/${item._id}`}>
          to deal
        </Link>
        <div>
          <div className={styles.imageWrapper}>
            <Image
              src={productPhoto}
              alt=""
              // width={300}
              // height={250}
              style={{
                objectFit: "cover",
                margin: "auto",
              }}
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              className={styles.imageWrapper}
              priority
            />
          </div>
          <h3 className={styles.cardTitle}>{item.product.title}</h3>
        </div>
        <MdCompareArrows style={{ fontSize: "60px" }} />
        <div>
          <div className={styles.imageWrapper}>
            <Image
              src={offerPhoto}
              alt=""
              // width={300}
              // height={250}
              style={{
                objectFit: "cover",
                margin: "auto",
              }}
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              className={styles.imageWrapper}
              priority
            />
          </div>
          <h3 className={styles.cardTitle}>{item.offer.title}</h3>
        </div>
      </div>
    </>
  );
};

export default MyDealsCard;
