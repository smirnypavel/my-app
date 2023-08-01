// MeOfferViewList.tsx
import React from "react";
import Image from "next/image";
import Button from "../../UI/Button";
import styles from "../../../styles/components/Account/ProductExchange/MeOfferViewList.module.css";

interface MeOfferViewListProps {
  offer: any; // Assuming you have an Item type defined
  onClose: () => void; // Add the onClose prop here
}

const MeOfferViewList: React.FC<MeOfferViewListProps> = ({ offer }) => {
  return (
    <div>
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
      <Button>Rejected</Button>
      <Button>Agree</Button>
    </div>
  );
};

export default MeOfferViewList;
