import React from "react";
import Link from "next/link";
import styles from "../../styles/components/Layout.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link
              href="/"
              className={styles.link}>
              <p>Home</p>
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/items"
              className={styles.link}>
              <p>Items</p>
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/auth"
              className={styles.link}>
              <p>SingUp</p>
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              href="/account"
              className={styles.link}>
              <p>Profile</p>
            </Link>
          </li>
          {/* Add additional links */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
