import React from "react";
import Navigation from "../Navigation/Navigation";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navigation />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
