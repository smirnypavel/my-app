// MeOfferViewList.tsx
import React from "react";
import Image from "next/image";
import Button from "../../UI/Button";
import styles from "../../../styles/components/Account/ProductExchange/MeOfferViewList.module.css";
import { IPosts, ToExchange } from "../../../types/IPost";
import axios from "axios";
import toast from "react-hot-toast";

interface MeOfferViewListProps {
  offer: ToExchange; // Assuming you have an Item type defined
  onClose: () => void; // Add the onClose prop here
  id: string;
  updatePost: (updatedPostData: IPosts) => void;
}

const MeOfferViewList: React.FC<MeOfferViewListProps> = ({
  offer,
  id,
  updatePost, // Получите updatePost из пропсов
}) => {
  const handleAddOffer = async () => {
    try {
      const response = await axios.post(
        `/posts/to-exchange-true/${id}/${offer.data.id}`
      );
      toast.success("You have successfully Agree to exchange");
      // Вызываем функцию для обновления поста в компоненте CardExchange
      updatePost(response.data);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.log("Error:", error);
    }
  };

  return (
    <div className={styles.MeOfferViewListWrapper}>
      <h4 className={styles.offerDataTitle}>{offer.data.title}</h4>
      <Image
        src={offer.data.img}
        alt=""
        width={150}
        height={150}
        style={{
          objectFit: "cover",
          margin: "auto",
        }}
        priority
      />
      <p>{offer.user.firstName}</p>
      <p>{offer.user.location}</p>
      <p className={styles.offerDataText}>
        {offer.data.description} Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Id recusandae quos officia architecto tempora porro
        neque nisi veritatis repellendus laborum quibusdam fugit ullam, pariatur
        consequuntur quia rem optio cum saepe! Architecto quibusdam quisquam
        suscipit nobis voluptates praesentium consectetur! Officia cupiditate
        hic consectetur perferendis, ex pariatur corrupti blanditiis optio dolor
        ipsum ad et, maiores nostrum provident! Eaque dolores nemo atque
        cupiditate.
      </p>
      <div className={styles.MeOfferViewListButton}>
        <Button>Rejected</Button>
        <Button onClick={handleAddOffer}>Agree</Button>
      </div>
    </div>
  );
};

export default MeOfferViewList;
