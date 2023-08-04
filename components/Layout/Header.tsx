import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/components/Layout.module.css";
import { useSelector } from "react-redux";
import {
  getRole,
  getUser,
  selectIsLoggedIn,
} from "../../redux/auth/authSelectors";
import { IUserAuth } from "../../types/IAuth";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { GoHome, GoPlusCircle, GoPerson, GoUnread } from "react-icons/go";

const Header: React.FC = () => {
  const user: IUserAuth = useSelector(getUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(getRole);
  const router = useRouter();
  const { t } = useTranslation();

  const isActiveLink = (path: string): boolean => {
    return router.pathname === path;
  };

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.logo}>
          Trade <span className={styles.logoSpan}>In</span>
        </h2>{" "}
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link
                href="/"
                className={`${styles.link} ${
                  isActiveLink("/") ? styles.activeLink : ""
                }`}>
                <p className={styles.textLink}>{t("header.home")}</p>
              </Link>
            </li>
            <li className={styles.li}>
              <Link
                href="/product"
                className={`${styles.link} ${
                  isActiveLink("/product") ? styles.activeLink : ""
                }`}>
                <p className={styles.textLink}>{t("header.products")}</p>
              </Link>
            </li>
            <li className={styles.li}>
              {isLoggedIn ? (
                role !== "user" && (
                  <Link
                    href="/admin"
                    className={styles.link}>
                    <p className={styles.textLink}>Admin Panel</p>
                  </Link>
                )
              ) : (
                <Link
                  href="/auth/login"
                  className={`${styles.link} ${
                    isActiveLink("/auth/login") ? styles.activeLink : ""
                  }`}>
                  <p className={styles.textLink}>{t("header.login")}</p>
                </Link>
              )}

              {isLoggedIn && (
                <Link
                  href="/account"
                  className={styles.userLink}>
                  <div className={styles.userHeader}>
                    <div>
                      <p>{user.firstName}</p>
                      <div className={styles.userIcon}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_112)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.63519 9.18368C5.63519 11.1675 5.92281 10.5837 4.82471 13.0037C3.48376 16.4523 8.87614 17.8618 11.9961 17.8618C15.1152 17.8618 20.5076 16.4523 19.1676 13.0037C18.0695 10.5837 18.3571 11.1675 18.3571 9.18368C18.3571 6.5294 16.4295 2.51416 11.9961 2.51416C7.56185 2.51416 5.63519 6.5294 5.63519 9.18368Z"
                              stroke="#070721"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.306 20.5122C13.0117 21.9579 10.9927 21.9751 9.68604 20.5122"
                              stroke="#070721"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_112">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={user.avatarURL}
                        alt="Logo"
                        width={52}
                        height={52}
                        style={{
                          objectFit: "cover",
                          margin: "auto",
                        }}
                        className={styles.photoUser}
                      />
                    </div>
                  </div>
                </Link>
              )}
            </li>
          </ul>
          <LanguageSwitcher />
        </nav>
      </header>
      <header className={styles.mobileHeader}>
        {" "}
        <nav>
          <ul className={styles.mobileHeaderLinkList}>
            <li className={styles.mobileHeaderLinkItem}>
              <Link
                href="/product"
                className={`${styles.linkMobile} ${
                  isActiveLink("/product") ? styles.activeLinkMobile : ""
                }`}>
                <GoHome />
                <p>home</p>
              </Link>
            </li>
            <li className={styles.mobileHeaderLinkItem}>
              <Link
                href={"./product/create"}
                className={`${styles.linkMobile} ${
                  isActiveLink("/product/create") ? styles.activeLinkMobile : ""
                }`}>
                <GoPlusCircle />
                <p>create</p>
              </Link>
            </li>
            <li className={styles.mobileHeaderLinkItem}>
              <GoUnread />
              <p>notification</p>
            </li>
            <li className={styles.mobileHeaderLinkItem}>
              <Link
                href="/account"
                className={`${styles.linkMobile} ${
                  isActiveLink("/account") ? styles.activeLinkMobile : ""
                }`}>
                <GoPerson />
                <p>Profile</p>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
