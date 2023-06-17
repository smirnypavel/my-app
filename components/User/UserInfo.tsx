import React, { useState } from "react";
import CustomModal from "../Modal/modal";
import Image from "next/image";
import photoNotFound from "../../public/photoNotFound.png";
import styles from "./UserInfo.module.css";

export default function UserInfo() {
  const [name, setName] = useState("Pavlik");
  const [phone, setPhone] = useState("+380934071309");
  const [email, setEmail] = useState("Makakosik@ukr.net");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ваш личный кабинет</h2>
      <div className={styles.userInfo}>
        <div className={styles.userPhoto}>
          <Image
            src={photoNotFound}
            alt=""
            priority={true}
            className={styles.userImage}
          />
        </div>
        <div className={styles.userInfoContainer}>
          <p className={styles.userInfoText}>Имя: {name}</p>
          <p className={styles.userInfoText}>Телефон: {phone}</p>
          <p>Email: {email}</p>
        </div>
        <div className={styles.userButton}>
          <button
            onClick={openModal}
            className={styles.Button}>
            Редактировать
          </button>
          <CustomModal
            isOpen={isOpen}
            onClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
}
