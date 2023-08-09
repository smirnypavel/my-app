import React, { useState } from "react";
import { logOut } from "../../redux/auth/authOperations";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/Page/Account.module.css";
import Profile from "./Profile";

import UserProduct from "./UserProduct";
import MyFavorites from "./MyFavorites";
import MeExchangeList from "./ProductExchange/MeExchangeList";
import IExchangeList from "./ProductExchange/IExchangeList";
import MyDeals from "./ProductExchange/MyDeals";

import { HiMiniArrowLeftOnRectangle } from "react-icons/hi2";
import Link from "next/link";

enum ActiveComponent {
  PROFILE = "profile",
  FAVORITES = "MyFavorites",
  MyPRODUCT = "UserProduct",
  MeOFFER = "MeExchangeList",
  MyOFFER = "IExchangeList",
  MyDEALS = "MyDeals",
}

const AccountPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
  //   ActiveComponent.PROFILE
  // );
  // const role = useSelector(getRole);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    dispatch(logOut());
    router.push("/");
  };

  // const handleComponentChange = (component: ActiveComponent) => {
  //   setActiveComponent(component);
  // };

  return (
    <>
      <div className={styles.accountContainer}>
        <div className={styles.buttonContainer}>
          <Link
            className={styles.button}
            href="/account">
            Profile
          </Link>
          <Link
            className={styles.button}
            href="/account/favorites">
            Favorites
          </Link>
          <Link
            className={styles.button}
            href="/account/my-product">
            My product
          </Link>
          <Link
            className={styles.button}
            href="/account/i-offered">
            I offered
          </Link>
          <Link
            className={styles.button}
            href="/account/me-offer">
            Me offer
          </Link>
          <Link
            className={styles.button}
            href="/account/my-deals">
            My deals
          </Link>
          <button
            onClick={handleLogOut}
            className={styles.logOutButton}>
            <HiMiniArrowLeftOnRectangle className={styles.icon} /> LogOut
          </button>
        </div>
        {/* {renderActiveComponent()} */}
        {children}
      </div>
    </>
  );
};

export default AccountPage;
