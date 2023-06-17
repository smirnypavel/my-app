import React from "react";
import styles from "./UserNavigation.module.css";

export default function UserNavigation() {
  return (
    <nav className={styles.container}>
      <ul className="space-y-6 h-screen text-sm">
        <li>Личный кабинет</li>
        <li>Мои товары </li>
        <li>Переписка</li>
      </ul>
    </nav>
  );
}
