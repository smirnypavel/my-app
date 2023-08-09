import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect } from "react";

import { MdCompareArrows } from "react-icons/md";
import productNotFound from "../../public/productNotFound.jpeg";
import { useAppDispatch } from "../../redux/hooks";
import { getDealById } from "../../redux/deals/dealsOperations";
import { useSelector } from "react-redux";
import { getDeal } from "../../redux/deals/dealsSelectors";

interface DealsDetailProps {
  dealId: string;
}

const DealsDetail: React.FC<DealsDetailProps> = () => {
  const deal = useSelector(getDeal);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMyDeals = async () => {
      try {
        if (typeof id === "string") {
          dispatch(getDealById(id));
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchMyDeals();
  }, []);
  const productPhoto = deal.product.img || productNotFound;
  const offerPhoto = deal.offer.img || productNotFound;
  const productTitle = deal.product.title || "Product Title Not Available";
  const offerTitle = deal.offer.title || "Offer Title Not Available";
  return (
    <>
      {" "}
      <div>
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
        <h3>{productTitle}</h3>
      </div>
      <MdCompareArrows style={{ fontSize: "60px" }} />
      <div>
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
        <h3>{offerTitle}</h3>
      </div>
    </>
  );
};
export default DealsDetail;
