import React from "react";
import { IComment } from "../../redux/posts/postsReducer";
import Image from "next/image";
import styles from "../../styles/components/Comments/Comments.module.css";

const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <>
      <div>Comment</div>
      <li className={styles.commentsList}>
        <div className={styles.comment}>
          <div>
            <Image
              src={comment.user.avatarURL}
              alt={"avatarURL"}
              height={50}
              width={50}
            />
            <h6>{comment.user.firstName}</h6>
          </div>
          <p>{comment.text}</p>
        </div>
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
