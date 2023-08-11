import React, { useState } from "react";
import { IChat } from "../../types/IDeals";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import styles from "../../styles/components/Comments/Comments.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { deletePostComment } from "../../redux/posts/postsOperations";
import { useRouter } from "next/router";

const DealsChat = ({ chat }: { chat: IChat }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  // const handleDeleteComment = () => {
  //   if (typeof id === "string") {
  //     dispatch(deletePostComment({ postId: id, commentId: chat.id }));
  //   }
  // };
  return (
    <>
      <li className={styles.commentsList}>
        <div className={styles.comment}>
          <div>
            <Image
              src={chat.user.avatarURL}
              alt={"avatarURL"}
              height={50}
              width={50}
              style={{
                objectFit: "cover",
                margin: "auto",
                borderRadius: 10,
              }}
            />
            <h6>{chat.user.firstName}</h6>
          </div>
          <p>{chat.text}</p>
          {/* <button
            onClick={handleDeleteComment}
            className={styles.deleteButton}>
            <MdDeleteForever />
          </button> */}
        </div>
      </li>
    </>
  );
};

export default DealsChat;
