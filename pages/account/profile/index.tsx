import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../../../styles/components/Account/Profile.module.css";
import { useSelector } from "react-redux";
import { IUserAuth } from "../../../types/IAuth";
import { getUser } from "../../../redux/auth/authSelectors";
import photoNotFound from "../../../public/photoNotFound.png";
import { differenceInDays } from "date-fns";
import Layout from "../../../components/Layout/Layout";
import PrivateRoute from "../../../redux/PrivateRoute";
import AccountPage from "../../../components/Account/AcountPage";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user: IUserAuth = useSelector(getUser);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(user.createdAt);

  const createdAtDate = new Date(user.createdAt);
  const currentDate = new Date();
  const daysAgo = differenceInDays(currentDate, createdAtDate);
  const avatarURL = user.avatarURL || photoNotFound; // Используйте photoNotFound, если avatarURL не определен

  return (
    <PrivateRoute>
      <Layout>
        <AccountPage>
          <div className={styles.profileContainer}>
            <h1>Your Profile</h1>
            <div className={styles.profile}>
              <div className={styles.imageWrapper}>
                <Image
                  src={avatarURL}
                  alt="avatar"
                  // width={300}
                  // height={350}
                  fill
                  sizes="(min-width: 808px) 50vw, 100vw"
                  style={{
                    objectFit: "cover",
                    margin: "auto",
                  }}
                  className={styles.imageWrapper}
                />
              </div>
              <div className={styles.profileInfo}>
                <ul className={styles.profileInfoList}>
                  <label>First Name</label>
                  <li className={styles.profileInfoItem}>
                    <h3 className={styles.profileInfoItemText}>
                      {user.firstName}
                    </h3>
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
                    <h3 className={styles.profileInfoItemText}>
                      {user.lastName}
                    </h3>
                  </li>

                  <label>Location</label>
                  <li className={styles.profileInfoItem}>
                    {" "}
                    <p className={styles.profileInfoItemText}>
                      {" "}
                      {user.location}
                    </p>
                  </li>
                  <label>Registration</label>
                  <li className={styles.profileInfoItem}>
                    {" "}
                    <p className={styles.profileInfoItemText}>
                      {" "}
                      {daysAgo} days
                    </p>
                  </li>
                  <li>
                    <Link
                      href="/account/settings"
                      className={styles.buttonUpdateProfile}>
                      Настройки профиля
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AccountPage>
      </Layout>
    </PrivateRoute>
  );
};

export default Profile;
