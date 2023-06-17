import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./customModal.module.css";

// Установите appElement в документе (необходимо для доступности)
Modal.setAppElement("#__next");

interface CustomModalProps {
  isOpen: boolean;
  onClose: (values: FormData | undefined) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    onClose(formData);
  };

  const handleModalClose = () => {
    onClose(undefined);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      contentLabel="Modal"
      className={styles.modal}
      //   overlayClassName={styles["modal-overlay"]}
    >
      <h2 className=" text-center mb-4">Внесите свои данные</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <h3>Имя:</h3>
          <input
            className={`block w-64 py-2 px-4 border rounded-xl border-slate-400 mb-4 text-sm shadow-md ${styles.input}`}
            type="text"
            placeholder="Please enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <h3>Номер телефона:</h3>
          <input
            className={`block w-64 py-2 px-4 border rounded-xl border-slate-400 mb-4 text-sm shadow-md ${styles.input}`}
            type="text"
            placeholder="Please enter your number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <h3>Ваш Email:</h3>
          <input
            className={`block w-64 py-2 px-4 border rounded-xl border-slate-400 shadow-md text-sm ${styles.input}`}
            type="text"
            placeholder="Please enter your mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-lg py-2 px-4 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm">
          Сохранить
        </button>
      </form>
      <button onClick={handleModalClose}>Закрыть</button>
    </Modal>
  );
};

export default CustomModal;
