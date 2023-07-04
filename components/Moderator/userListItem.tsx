import React from "react";
import Image from "next/image";
import { IUserAuth } from "../../redux/auth/authReducer";
import photoNotFound from "../../public/photoNotFound.png";
import styles from "../../styles/components/Moderator/userListItem.module.css";
import { userAgent } from "next/server";

interface UserListItemProps {
  item: IUserAuth;
}

export const UserListItem: React.FC<UserListItemProps> = ({ item }) => {
  return (
    <>
      <div className={styles.userCard}>
        <Image
          src={item.avatarURL}
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.cardWraper}>
          <p>
            {item.firstName} {item.lastName}
          </p>
          <p></p>
          <p>{item.role}</p>
          <p>{item.email}</p>
        </div>
      </div>
    </>
  );
};
