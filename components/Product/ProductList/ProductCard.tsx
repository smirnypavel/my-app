import React, { useState } from "react";
import Image from "next/image";
import styles from "../../../styles/components/ItemList.module.css";
import photoNotFound from "../../../public/photoNotFound.png";
import productNotFound from "../../../public/productNotFound.jpeg";
import { IPosts, IPostState, Owner } from "../../../redux/posts/postsReducer";
import Link from "next/link";

interface ItemCardProps {
  item: any; // Assuming you have an Item type defined
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  // const [product, setProduct] = useState<IPostState>(item);
  const owner = item.owner;

  const productPhoto = item.img || productNotFound; // Используйте photoNotFound, если productPhoto не определен
  const avatarURL = owner?.avatarURL || photoNotFound; // Используйте photoNotFound, если avatarURL не определен

  return (
    <div className={styles.itemCard}>
      <div className={styles.favoritesIcon}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3677 3.76098C13.0191 3.32839 11.3891 3.66702 10.5641 4.91834C10.4512 5.08965 10.2613 5.19461 10.0562 5.19916C9.85105 5.20372 9.65674 5.10729 9.5363 4.94117C8.63734 3.7012 7.03296 3.33362 5.70926 3.76078L5.7088 3.76093C3.21838 4.56251 2.2012 7.593 3.02993 10.1809C3.69637 12.2549 5.15395 13.8376 6.63548 14.9092C7.37383 15.4432 8.1064 15.8415 8.72716 16.1042C9.36847 16.3756 9.83031 16.4768 10.0423 16.4768C10.2526 16.4768 10.7161 16.3736 11.3621 16.0977C11.9867 15.831 12.7238 15.4277 13.4651 14.8902C14.9537 13.8109 16.4081 12.2289 17.0511 10.1843L17.052 10.1813C17.8798 7.59449 16.8582 4.56298 14.3677 3.76098ZM10.0249 3.60547C11.2987 2.31063 13.2359 2.08505 14.7499 2.57087L14.7505 2.57106C18.1193 3.65566 19.2011 7.56459 18.2431 10.5608C17.4942 12.9405 15.8252 14.723 14.1989 15.9022C13.3826 16.494 12.5642 16.9436 11.8531 17.2473C11.1633 17.5419 10.5107 17.7268 10.0423 17.7268C9.57598 17.7268 8.92752 17.5463 8.23997 17.2554C7.53187 16.9557 6.71705 16.5109 5.9029 15.922C4.27948 14.7478 2.6117 12.9655 1.83977 10.563L1.8396 10.5625C0.880193 7.56711 1.95465 3.65622 5.32566 2.5711M10.0249 3.60547C8.7341 2.36508 6.86198 2.07549 5.32582 2.57104Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5353 6.2394C12.5706 5.89603 12.8775 5.64627 13.2209 5.68154C13.8813 5.74939 14.4479 6.0521 14.8373 6.54446C15.2226 7.03171 15.402 7.66254 15.3792 8.34257C15.3676 8.68755 15.0786 8.95783 14.7336 8.94625C14.3886 8.93468 14.1183 8.64563 14.1299 8.30064C14.1446 7.86317 14.0282 7.5365 13.8568 7.31979C13.6895 7.10819 13.4386 6.96049 13.0932 6.925C12.7498 6.88972 12.5 6.58277 12.5353 6.2394Z"
          />
        </svg>
      </div>
      <Image
        src={productPhoto}
        alt=""
        width={150}
        height={150}
        priority
      />
      <h3>{item.title}</h3>
      <div className={styles.ownerInfo}>
        <Image
          src={avatarURL}
          alt=""
          width={28}
          height={28}
          className={styles.ownerImage}
        />
        <p className={styles.ownerName}>Owner: {owner?.firstName}</p>
      </div>
      <p className={styles.ownerName}>VIEWS: {item.views}</p>
      <Link
        href="/product/[id]"
        as={`/product/${item._id}`}
        className={styles.button}>
        TradeIn
      </Link>
    </div>
  );
};

export default ItemCard;