import React, { useState } from "react";
import { logOut } from "../../redux/auth/authOperations";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/Page/Account.module.css";

import { MdMenu, MdClear } from "react-icons/md";

import { HiMiniArrowLeftOnRectangle } from "react-icons/hi2";
import Link from "next/link";

const AccountPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Изменение состояния меню при нажатии
  };

  const isActiveLink = (path: string): boolean => {
    return router.pathname === path;
  };

  const handleLogOut = async () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <>
      <div className={styles.accountContainer}>
        {isMenuOpen && (
          <div
            className={styles.modalBackdrop}
            onClick={handleMenuToggle}></div>
        )}

        <div
          className={`${styles.mobileButtonContainer} ${
            isMenuOpen ? styles.open : ""
          }`}>
          <button
            onClick={handleMenuToggle}
            className={styles.menuButton}>
            <MdClear />
          </button>
          <Link
            href="/account/profile"
            className={`${styles.button} ${
              isActiveLink("/account") ? styles.activeButton : ""
            }`}>
            Profile
          </Link>
          <Link
            href="/account/favorites"
            className={`${styles.button} ${
              isActiveLink("/account/favorites") ? styles.activeButton : ""
            }`}>
            Favorites
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/my-product") ? styles.activeButton : ""
            }`}
            href="/account/my-product">
            My product
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/i-offered") ? styles.activeButton : ""
            }`}
            href="/account/i-offered">
            I offered
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/me-offer") ? styles.activeButton : ""
            }`}
            href="/account/me-offer">
            Me offer
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/my-deals") ? styles.activeButton : ""
            }`}
            href="/account/my-deals">
            My deals
          </Link>
          <button
            onClick={handleLogOut}
            className={styles.logOutButton}>
            <HiMiniArrowLeftOnRectangle className={styles.icon} /> LogOut
          </button>
        </div>
        <div>
          <MdMenu
            className={styles.burgerMenu}
            onClick={handleMenuToggle}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Link
            href="/account/profile"
            className={`${styles.button} ${
              isActiveLink("/account") ? styles.activeButton : ""
            }`}>
            Profile
          </Link>
          <Link
            href={"/product/create"}
            className={styles.buttonCreate}>
            Add product
          </Link>
          <Link
            href="/account/favorites"
            className={`${styles.button} ${
              isActiveLink("/account/favorites") ? styles.activeButton : ""
            }`}>
            Favorites
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/my-product") ? styles.activeButton : ""
            }`}
            href="/account/my-product">
            My product
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/i-offered") ? styles.activeButton : ""
            }`}
            href="/account/i-offered">
            I offered
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/me-offer") ? styles.activeButton : ""
            }`}
            href="/account/me-offer">
            Me offer
          </Link>
          <Link
            className={`${styles.button} ${
              isActiveLink("/account/my-deals") ? styles.activeButton : ""
            }`}
            href="/account/my-deals">
            My deals
          </Link>
          <button
            onClick={handleLogOut}
            className={styles.logOutButton}>
            <HiMiniArrowLeftOnRectangle className={styles.icon} /> LogOut
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default AccountPage;
