import React from "react";
import styles from "../styles/Page/404.module.css";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import Link from "next/link";

const Error404 = () => {
  return (
    <div className={styles.oopss}>
      <Layout>
        <div className={styles.errorText}>
          <Image
            src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
            alt="404"
            width={200}
            height={200}
          />
          <span>404 PAGE</span>
          <p className={styles.pA}>
            . The page you were looking for could not be found
          </p>
          <p className={styles.pB}>... Back to home page</p>
          <Link
            href="/"
            className={styles.back}>
            ... Back to home page
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default Error404;
