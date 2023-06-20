import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "../../styles/components/Account/Profile.module.css";
import photoNotFound from "../../public/photoNotFound.png";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Assume user data is available
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    photo: photoNotFound,
    // Additional user data
  };

  return (
    <div className={styles.profile}>
      <div className={styles.imageProfile}>
        <Image
          src={user.photo}
          alt=""
          width={150}
        />
      </div>
      <div className={styles.userInfo}>
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
      </div>

      {/* Additional user details */}
      <Link href="./account/settings">Настройки профиля</Link>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </div>
  );
};

export default Profile;
