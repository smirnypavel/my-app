import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { logOut } from "../../redux/auth/authOperations";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/Page/Account.module.css";
import Profile from "../../components/Account/Profile";
import Component1 from "../../components/Moderator/moderateProduct";
import Component2 from "../../components/Moderator/moderateProfile";
import Component3 from "../../components/Moderator/moderateTradings";

enum ActiveComponent {
  PROFILE = "profile",
  COMPONENT1 = "component1",
  COMPONENT2 = "component2",
  COMPONENT3 = "component3",
}

const AccountPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.PROFILE
  );
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
      case ActiveComponent.COMPONENT1:
        return <Component1 />;
      case ActiveComponent.COMPONENT2:
        return <Component2 />;
      case ActiveComponent.COMPONENT3:
        return <Component3 />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <h1>Account</h1>

      <div className={styles.accountContainer}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.PROFILE)}>
            <span className={styles.notification}>2</span>
            Profile
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.COMPONENT1)}>
            <span className={styles.notification}>2</span>
            moderateProduct
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.COMPONENT2)}>
            <span className={styles.notification}>2</span>
            moderateProfile
          </button>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.COMPONENT3)}>
            <span className={styles.notification}>2</span>
            moderateTradings
          </button>
          <button onClick={handleLogOut}>LogOut</button>
        </div>

        {renderActiveComponent()}
      </div>
    </Layout>
  );
};

export default AccountPage;
