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
import Button from "../UI/Button";

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
  }, [id]);

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
  const handleBack = () => {
    router.back();
  };
  const productPhoto = deal.product.img || productNotFound;
  const ownerProductPhoto = deal.product.owner.avatarURL || photoNotFound;
  const offerPhoto = deal.offer.img || productNotFound;
  const ownerOfferPhoto = deal.offer.owner.avatarURL || photoNotFound;

  return (
    <div className={styles.deals}>
      <h4 className={styles.dealsTitle}>
        Deal between{" "}
        <h2 className={styles.name}>{deal.product.owner.firstName}</h2> and{" "}
        <h2 className={styles.name}>{deal.offer.owner.firstName}</h2>
      </h4>
      <div className={styles.dealsContainer}>
        <button
          onClick={handleBack}
          className={styles.backButton}>
          {" <<< "} Back
        </button>
        <div className={styles.dealsProductInfo}>
          <div className={styles.imageContainer}>
            <div className={styles.ownerInfo}>
              <Image
                src={ownerProductPhoto}
                alt=""
                width={50}
                height={50}
                className={styles.ownerImage}
              />
              <h6>{deal.product.owner.firstName}</h6>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src={productPhoto}
                alt=""
                style={{
                  objectFit: "cover",
                  margin: "auto",
                }}
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                className={styles.imageWrapper}
              />
            </div>
          </div>
          <h3 className={styles.productTitle}>{deal.product.title}</h3>
          <p>{deal.product.location}</p>
          <p className={styles.productDescription}>
            {deal.product.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aperiam tenetur minus velit vel molestiae, dolor
            repudiandae incidunt ullam quaerat laboriosam quidem eligendi
            exercitationem modi minima sint consequatur ipsam deserunt fugiat!
            Nihil ex ullam, sint, illo maiores commodi magni, doloremque a unde
            adipisci laborum quisquam dolorem reiciendis expedita mollitia.
            Ipsam similique ab aut ex repudiandae labore animi eligendi dolore
            ducimus ad. Iste at iusto beatae maiores eos ut adipisci tenetur
            ipsa omnis totam, minima autem cum fuga laborum. Quas magni quae
            rem, eius sed perspiciatis doloremque impedit ullam modi ex facere.
            Iusto quidem ipsum rem cumque, totam provident error asperiores
            pariatur quae, beatae laudantium, repellat laboriosam aspernatur
            neque quaerat sint quod fugiat? Minima expedita cupiditate magnam
            error corrupti ut nesciunt eligendi. Vero delectus at reprehenderit
            accusantium sit. Itaque culpa similique id impedit laudantium,
            tenetur explicabo eum at consequatur maiores? Odio ad asperiores
            dicta vitae debitis reiciendis tenetur quidem nobis totam dolorum.
          </p>
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
                className={styles.ownerImage}
              />
              <h6>{deal.offer.owner.firstName}</h6>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src={offerPhoto}
                alt=""
                style={{
                  objectFit: "cover",
                  margin: "auto",
                }}
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                className={styles.imageWrapper}
              />
            </div>
            <h3 className={styles.productTitle}>{deal.offer.title}</h3>
            <p>{deal.offer.location}</p>
            <p className={styles.productDescription}>
              {deal.offer.description}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button>Leave deal</Button>
        <Button>Complete deal</Button>
        <Button>Сomplain</Button>
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
    </div>
  );
};
export default DealsDetail;
