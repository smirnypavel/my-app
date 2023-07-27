// MeOfferViewList.tsx
import React from "react";
import Image from "next/image";

interface MeOfferViewListProps {
  offer: any; // Assuming you have an Item type defined
  onClose: () => void; // Add the onClose prop here
}

const MeOfferViewList: React.FC<MeOfferViewListProps> = ({ offer }) => {
  return (
    <div>
      <p>{offer.data.title}</p>
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
      <p>{offer.data.owner.firstName}</p>
      <p>{offer.data.description}</p>
    </div>
  );
};

export default MeOfferViewList;
