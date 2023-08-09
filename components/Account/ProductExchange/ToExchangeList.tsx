import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts, ToExchange } from "../../../types/IPost";
import styles from "../../../styles/components/Account/UserExchangeList.module.css";
import Image from "next/image";
import Button from "../../UI/Button";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../redux/hooks";
import {
  deletePostExchange,
  offerPostExchange,
} from "../../../redux/posts/postsOperations";
import toast from "react-hot-toast";

interface ToExchangeListProps {
  product: IPosts;
}

const ToExchangeList: React.FC<ToExchangeListProps> = ({ product }) => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [offerId, setOfferId] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/posts/my");
        setPosts(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProduct();
  }, []);

  const handleToExchange = async (offerId: string) => {
    try {
      if (typeof id === "string") {
        await dispatch(offerPostExchange({ postId: id, offerId }));
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const handleDeleteExchange = async (offerId: string) => {
    try {
      if (typeof id === "string") {
        const foundExchangeId = function findInToExchange(
          toExchangeArray: any[],
          ownerId: string
        ) {
          const foundItem = toExchangeArray.find(
            (item) => item.data.id === ownerId
          );
          return foundItem;
        };
        const exchangeID: string = foundExchangeId(
          product.toExchange,
          offerId
        ).id;
        await dispatch(deletePostExchange({ postId: id, exchangeID }));
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <>
      <div>
        <h3 className={styles.title}>List of my items for exchange</h3>
        <div>
          {posts.map((post: IPosts) => (
            <div
              key={post._id}
              className={styles.exchangeList}>
              <Image
                src={post.img}
                alt={"post avatar"}
                height={50}
                width={50}
                style={{
                  objectFit: "cover",
                }}
                className={styles.imgClass}
              />
              <p>{post.title}</p>
              {product.toExchange.some(
                (exchangeItem: ToExchange) => exchangeItem.data.id === post._id
              ) ? (
                <Button
                  type="button"
                  onClick={() => handleDeleteExchange(post._id)}>
                  cancel the offer
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => handleToExchange(post._id)}>
                  OFFER
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToExchangeList;
