import React, { useState } from "react";
import { IComment } from "../../types/IPost";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import styles from "../../styles/components/Comments/Comments.module.css";
import { useAppDispatch } from "../../redux/hooks";
import {
  deletePostComment,
  replyPostComment,
} from "../../redux/posts/postsOperations";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";

const Comment = ({ comment }: { comment: IComment }) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const IsLogin = useSelector(selectIsLoggedIn);
  const [commentReply, setCommentReply] = useState("");

  const handleOpenAnswer = () => {
    setIsShowInput((prevState) => !prevState);
  };

  const handleCommentAdd = async () => {
    try {
      if (typeof id === "string") {
        await dispatch(
          replyPostComment({
            postId: id,
            commentId: comment.id,
            credentials: { text: commentReply },
          })
        );
        setCommentReply("");
        setIsShowInput(false);
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const handleDeleteComment = () => {
    if (typeof id === "string") {
      dispatch(deletePostComment({ postId: id, commentId: comment.id }));
    }
  };
  return (
    <>
      <li className={styles.commentsList}>
        <div className={styles.comment}>
          <div>
            <Image
              src={comment.user.avatarURL}
              alt={"avatarURL"}
              height={50}
              width={50}
              style={{
                objectFit: "cover",
                margin: "auto",
                borderRadius: 10,
              }}
            />
            <h6>{comment.user.firstName}</h6>
          </div>
          <p>{comment.text}</p>
          {IsLogin && (
            <>
              <button
                onClick={handleOpenAnswer}
                className={styles.answerButton}>
                {isShowInput
                  ? t("productDetail.closeAnswer")
                  : t("productDetail.addAnswer")}
              </button>
              <button
                onClick={handleDeleteComment}
                className={styles.deleteButton}>
                <MdDeleteForever />
              </button>
            </>
          )}
        </div>
        {isShowInput && (
          <>
            <div className={styles.inputReplyWrapper}>
              <textarea
                value={commentReply}
                placeholder={t("productDetail.comment")}
                onChange={(e) => setCommentReply(e.target.value)}
                className={styles.inputReply}
              />
              <button
                className={styles.replyButton}
                type="button"
                onClick={() => handleCommentAdd()}>
                {t("productDetail.submitComment")}
              </button>
            </div>
          </>
        )}
        <ul>
          {comment.answer.map((answer) => (
            <li
              key={answer.id}
              className={styles.answerList}>
              <div className={styles.answer}>
                <div>
                  <h6>{answer.user.firstName}</h6>
                  <Image
                    src={answer.user.avatarURL}
                    alt={"avatarURL"}
                    height={30}
                    width={30}
                    style={{
                      objectFit: "cover",
                      margin: "auto",
                      borderRadius: 5,
                    }}
                  />
                </div>
                <p>{answer.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
};

export default Comment;
