import React from "react";
import Image from "next/image";
import { IUserAuth } from "../../types/IAuth";
import styles from "../../styles/components/Moderator/userListItem.module.css";
import Link from "next/link";

interface UserListItemProps {
  item: IUserAuth;
}

export const UserListItem: React.FC<UserListItemProps> = ({ item }) => {
  return (
    <>
      <div className={styles.userCard}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.avatarURL}
            alt=""
            width={150}
            height={200}
            style={{
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </div>
        <div className={styles.cardWrapper}>
          <p>
            {item.firstName} {item.lastName}
          </p>
          <p></p>
          <p>{item.role}</p>
          <p>{item.email}</p>
          <Link
            href="/user/[id]"
            as={`/user/${item._id}`}>
            Посмотреть профиль
          </Link>
        </div>
      </div>
    </>
  );
};
