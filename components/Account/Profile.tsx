import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/components/Account/Profile.module.css";
import { useSelector } from "react-redux";
import { IUserAuth } from "../../redux/auth/authReducer";
import { getUser } from "../../redux/auth/authSelectors";
import photoNotFound from "../../public/photoNotFound.png";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user: IUserAuth = useSelector(getUser);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const avatarURL = user.avatarURL || photoNotFound; // Используйте photoNotFound, если avatarURL не определен

  return (
    <div className={styles.profileContainer}>
      <h1>Ваш профиль</h1>
      <div className={styles.profile}>
        <div className={styles.imageWrapper}>
          <Image
            src={avatarURL}
            alt="avatar"
            width={250}
            height={300}
            style={{
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </div>
        <div className={styles.profileInfo}>
          <ul className={styles.profileInfoList}>
            <label>First Name</label>
            <li className={styles.profileInfoItem}>
              <h3 className={styles.profileInfoItemText}>{user.firstName}</h3>
            </li>
            <label>Phone</label>
            <li className={styles.profileInfoItem}>
              <p className={styles.profileInfoItemText}> {user.phone}</p>
            </li>

            <label>Email</label>
            <li className={styles.profileInfoItem}>
              {" "}
              <p className={styles.profileInfoItemText}> {user.email}</p>
            </li>
          </ul>
          <ul>
            <label>Last Name</label>
            <li className={styles.profileInfoItem}>
              {" "}
              <h3 className={styles.profileInfoItemText}>{user.lastName}</h3>
            </li>

            <label>Location</label>
            <li className={styles.profileInfoItem}>
              {" "}
              <p className={styles.profileInfoItemText}> {user.location}</p>
            </li>
            <li>
              <Link
                href="./account/settings"
                className={styles.buttonUpdateProfile}>
                Настройки профиля
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
