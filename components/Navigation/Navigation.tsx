import React from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li>
              <Link
                href="/"
                className={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/user"
                className={styles.link}>
                User
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={styles.link}>
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
