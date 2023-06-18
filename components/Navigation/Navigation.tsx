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
                className="text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/user">User</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
