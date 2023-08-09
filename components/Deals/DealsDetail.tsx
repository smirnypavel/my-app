import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdCompareArrows } from "react-icons/md";
import productNotFound from "../../public/productNotFound.jpeg";
import photoNotFound from "../../public/photoNotFound.png";
import { useAppDispatch } from "../../redux/hooks";
import { addDealComment, getDealById } from "../../redux/deals/dealsOperations";
import { useSelector } from "react-redux";
import { getDeal } from "../../redux/deals/dealsSelectors";
import styles from "../../styles/components/Deals/DealsDetail.module.css";
import DealsChat from "./DealsChat";

interface DealsDetailProps {
  dealId: string;
}

const DealsDetail: React.FC<DealsDetailProps> = () => {
  const deal = useSelector(getDeal);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");

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

  const handleCommentAdd = async () => {
    try {
      if (typeof id === "string" && id) {
        await dispatch(
          addDealComment({
            dealId: id,
            credentials: { text: comment },
          })
        );
        setComment("");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const productPhoto = deal.product.img || productNotFound;
  const ownerProductPhoto = deal.product.owner.avatarURL || photoNotFound;
  const offerPhoto = deal.offer.img || productNotFound;
  const ownerOfferPhoto = deal.offer.owner.avatarURL || photoNotFound;

  return (
    <>
      <h4 className={styles.dealsTitle}>
        Deal between{" "}
        <h2 className={styles.name}>{deal.product.owner.firstName}</h2> and{" "}
        <h2 className={styles.name}>{deal.offer.owner.firstName}</h2>
      </h4>
      <div className={styles.dealsContainer}>
        <div className={styles.dealsProductInfo}>
          <div className={styles.imageContainer}>
            <div className={styles.ownerInfo}>
              <Image
                src={ownerProductPhoto}
                alt=""
                width={50}
                height={50}
                style={{
                  objectFit: "cover",
                }}
                priority
              />
              <h6>{deal.product.owner.firstName}</h6>
            </div>
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
          </div>
          <h3>{deal.product.title}</h3>
          <p>{deal.product.location}</p>
          <p>{deal.product.description}</p>
        </div>
        <div className={styles.MdCompareArrows}>
          <MdCompareArrows />
        </div>
        <div className={styles.dealsProductInfo}>
          <div className={styles.imageContainer}>
            <div className={styles.ownerInfo}>
              <Image
                src={ownerOfferPhoto}
                alt=""
                width={50}
                height={50}
                style={{
                  objectFit: "cover",
                }}
                priority
              />
              <h6>{deal.offer.owner.firstName}</h6>
            </div>
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
          </div>
          <h3>{deal.offer.title}</h3>
          <p>{deal.offer.location}</p>
          <p>{deal.offer.description}</p>
        </div>
      </div>
      <ul className={styles.commentWrapper}>
        {deal.chat.map((item) => (
          <DealsChat
            key={item.id}
            chat={item}
          />
        ))}
      </ul>
      <div className={styles.inputCommentWrapper}>
        <textarea
          value={comment}
          placeholder="leave your comment"
          onChange={(e) => setComment(e.target.value)}
          className={styles.inputComment}
        />
        <button
          className={styles.inputCommentButton}
          type="button"
          onClick={() => handleCommentAdd()}>
          Submit
        </button>
      </div>
    </>
  );
};
export default DealsDetail;
