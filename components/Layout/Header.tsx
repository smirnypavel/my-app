import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/components/Layout.module.css";
import Logo3 from "../../public/Logo3.svg";

const Header: React.FC = () => {
  const router = useRouter();

  const isActiveLink = (path: string): boolean => {
    return router.pathname === path;
  };

  return (
    <header className={styles.header}>
      <Image
        src={Logo3}
        alt="Logo"
        className={styles.logo}
      />{" "}
      {/* Вставка логотипа */}
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link
              href="/"
              className={`${styles.link} ${
                isActiveLink("/") ? styles.activeLink : ""
              }`}>
              <p className={styles.textLink}>Home</p>
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/items"
              className={`${styles.link} ${
                isActiveLink("/items") ? styles.activeLink : ""
              }`}>
              <p className={styles.textLink}>Items</p>
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/auth"
              className={`${styles.link} ${
                isActiveLink("/auth") ? styles.activeLink : ""
              }`}>
              <p className={styles.textLink}>SignUp</p>
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/account"
              className={`${styles.link} ${
                isActiveLink("/account") ? styles.activeLink : ""
              }`}>
              <p>Profile</p>
            </Link>
          </li>
          {/* Добавьте дополнительные ссылки */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
