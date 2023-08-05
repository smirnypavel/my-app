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

enum ActiveComponent {
  PROFILE = "profile",
  FAVORITES = "MyFavorites",
  MyPRODUCT = "UserProduct",
  MeOFFER = "MeExchangeList",
  MyOFFER = "IExchangeList",
  MyDEALS = "MyDeals",
}

const AccountPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.PROFILE
  );
  // const role = useSelector(getRole);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    dispatch(logOut());
    router.push("/");
  };

  const handleComponentChange = (component: ActiveComponent) => {
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case ActiveComponent.PROFILE:
        return <Profile />;
      case ActiveComponent.FAVORITES:
        return <MyFavorites />;
      case ActiveComponent.MyPRODUCT:
        return <UserProduct />;
      case ActiveComponent.MeOFFER:
        return <MeExchangeList />;
      case ActiveComponent.MyOFFER:
        return <IExchangeList />;
      case ActiveComponent.MyDEALS:
        return <MyDeals />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.accountContainer}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.PROFILE)}>
            {/* <span className={styles.notification}>2</span> */}
            Profile
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.MyPRODUCT)}>
            {/* <span className={styles.notification}>2</span> */}
            My Product
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.FAVORITES)}>
            {/* <span className={styles.notification}>2</span> */}
            My Favorites
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.MeOFFER)}>
            {/* <span className={styles.notification}>2</span> */}
            Me Offer
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.MyOFFER)}>
            {/* <span className={styles.notification}>2</span> */}
            My Offer
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.MyDEALS)}>
            {/* <span className={styles.notification}>2</span> */}
            My Deals
          </button>
          <button
            onClick={handleLogOut}
            className={styles.logOutButton}>
            <HiMiniArrowLeftOnRectangle className={styles.icon} /> LogOut
          </button>
        </div>
        {renderActiveComponent()}
      </div>
    </>
  );
};

export default AccountPage;
