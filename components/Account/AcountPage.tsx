import React, { useState } from "react";
import { logOut } from "../../redux/auth/authOperations";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/Page/Account.module.css";
import Profile from "./Profile";

import UserProduct from "../../components/Account/UserProduct";
import MyFavorites from "../../components/Account/MyFavorites";
import OfferExchange from "../../components/Account/OfferExchangeList";

import { HiMiniArrowLeftOnRectangle } from "react-icons/hi2";

enum ActiveComponent {
  PROFILE = "profile",
  FAVORITES = "MyFavorites",
  MYPRODUCT = "UserProduct",
  MEOFFER = "OfferExchange",
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
      case ActiveComponent.MYPRODUCT:
        return <UserProduct />;
      case ActiveComponent.MEOFFER:
        return <OfferExchange />;
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
            onClick={() => handleComponentChange(ActiveComponent.MYPRODUCT)}>
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
            onClick={() => handleComponentChange(ActiveComponent.MEOFFER)}>
            {/* <span className={styles.notification}>2</span> */}
            Me Offer
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
