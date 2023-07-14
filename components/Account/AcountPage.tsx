import React, { useState } from "react";
import { logOut } from "../../redux/auth/authOperations";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/Page/Account.module.css";
import Profile from "./Profile";
import Component1 from "../../components/Moderator/moderateProduct";
import Component2 from "../../components/Moderator/moderateProfile";
import UserProduct from "../../components/Account/UserProduct";
import Component3 from "../../components/Moderator/moderateTradings";
import { HiMiniArrowLeftOnRectangle } from "react-icons/hi2";

enum ActiveComponent {
  PROFILE = "profile",
  COMPONENT1 = "component1",
  COMPONENT2 = "component2",
  COMPONENT3 = "component3",
  MYPRODUCT = "UserProduct",
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
      case ActiveComponent.COMPONENT1:
        return <Component1 />;
      case ActiveComponent.COMPONENT3:
        return <Component3 />;
      case ActiveComponent.COMPONENT2:
        return <Component2 filterRole={""} />;
      case ActiveComponent.MYPRODUCT:
        return <UserProduct />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Account</h1>

      <div className={styles.accountContainer}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleComponentChange(ActiveComponent.PROFILE)}>
            {/* <span className={styles.notification}>2</span> */}
            Profile
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
