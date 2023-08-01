import React, { useState } from "react";
import Image from "next/image";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import styles from "../../../styles/components/ItemList.module.css";
import styles2 from "../../../styles/components/Account/ProductExchange/CardExchange.module.css";
import productNotFound from "../../../public/productNotFound.jpeg";
import { IPosts } from "../../../redux/posts/postsReducer";
import MeOfferViewList from "./MeOfferViewList";
import Modal from "../../Modal/Modal";
import Button from "../../UI/Button";

interface CardExchangeProps {
  item: IPosts; // Assuming you have an Item type defined
}

const CardExchange: React.FC<CardExchangeProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setCurrentOfferIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const productPhoto = item.img || productNotFound;

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
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <Button onClick={() => openModal(0)}>
          Views offer {item.toExchange?.length}
        </Button>
        {isModalOpen && item.toExchange?.length && (
          <Modal
            isOpen={true}
            onClose={closeModal}>
            <div className={styles2.cardWrapper}>
              <button
                className={styles2.arrowButtonLeft}
                onClick={() =>
                  setCurrentOfferIndex((prevIndex) =>
                    prevIndex === 0
                      ? item.toExchange!.length - 1
                      : prevIndex - 1
                  )
                }
                disabled={currentOfferIndex === 0} // Отключаем левую кнопку, если текущий индекс равен 0
              >
                <FiArrowLeftCircle />
              </button>
              <MeOfferViewList
                offer={item.toExchange[currentOfferIndex]}
                onClose={closeModal}
              />
              <button
                className={styles2.arrowButtonRight}
                onClick={() =>
                  setCurrentOfferIndex((prevIndex) =>
                    prevIndex === item.toExchange!.length - 1
                      ? 0
                      : prevIndex + 1
                  )
                }
                disabled={currentOfferIndex === item.toExchange!.length - 1} // Отключаем правую кнопку, если текущий индекс равен последнему элементу
              >
                <FiArrowRightCircle />
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default CardExchange;
