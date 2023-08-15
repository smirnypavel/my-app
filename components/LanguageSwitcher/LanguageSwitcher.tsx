import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import FlagUkraine from "../../public/Flags/FlagUkraine.png";
import styles from "../../styles/components/Layout/LanguageSwitcher.module.css";
import FlagUnitedKingdom from "../../public/Flags/FlagUnitedKingdom.png";

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const handleLanguageChange = (locale: string) => {
    i18n.changeLanguage(locale);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.switcherContainer}>
      <button
        onClick={toggleDropdown}
        className={styles.toggleButton}>
        {t("header.language")}
      </button>
      {isOpen && (
        <div className={styles.toggleWrapper}>
          <button
            onClick={() => handleLanguageChange("uk")}
            className={styles.toggleButton}>
            <Image
              src={FlagUkraine}
              alt={""}
              height={16}
              width={16}></Image>
            Укр
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={styles.toggleButton}>
            <Image
              src={FlagUnitedKingdom}
              alt={""}
              height={16}
              width={16}></Image>
            En
          </button>
          <button
            onClick={() => handleLanguageChange("ru")}
            className={styles.toggleButton}>
            Ру
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
