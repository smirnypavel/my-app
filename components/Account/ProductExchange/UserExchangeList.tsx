import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../../redux/posts/postsReducer";
import styles from "../../../styles/components/Account/UserExchangeList.module.css";
import Image from "next/image";
import Button from "../../UI/Button";

const UserExchangeList = () => {
  const [posts, setPost] = useState<IPosts[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/posts/my");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div>
        <p>List of my items for exchange</p>
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
              />
              <p>{post.title}</p>
              <Button type="button">OFFER</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default UserExchangeList;
