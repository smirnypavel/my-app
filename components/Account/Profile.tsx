import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/components/Account/Profile.module.css";
import { useSelector } from "react-redux";
import { IUserAuth } from "../../redux/auth/authReducer";
import { getUser } from "../../redux/auth/authSelectors";
import { useAppDispatch } from "../../redux/hooks";
import { signInGoogle } from "../../redux/auth/authOperations";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user: IUserAuth = useSelector(getUser);
  const dispatch = useAppDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleClickGoogle = () => {
    dispatch(signInGoogle);
  };
  // Assume user data is available

  return (
    <div className={styles.profile}>
      <div className={styles.imageWrapper}>
        <Image
          src={user.avatarURL}
          alt="avatar"
          width={150}
          height={200}
          style={{
            objectFit: "cover",
            margin: "auto",
          }}
        />
      </div>
      <div className={styles.userInfo}>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Location: {user.location}</p>
        <button onClick={handleClickGoogle}>google</button>
      </div>
      {/* Additional user details */}
      <Link href="./account/settings">Настройки профиля</Link>
    </div>
  );
};

export default Profile;
