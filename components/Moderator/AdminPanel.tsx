import React, { useState } from "react";
import {
  HiMiniChartBar,
  HiUsers,
  HiMiniShoppingCart,
  HiMiniFaceFrown,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/Page/Account.module.css";
import Component1 from "../../components/Moderator/moderateProduct";
import Component2 from "../../components/Moderator/moderateProfile";
import Component3 from "../../components/Moderator/moderateTradings";
import Component4 from "../../components/Moderator/Statistic";
import { getRole } from "../../redux/auth/authSelectors";

enum ActiveComponent {
  COMPONENT1 = "component1",
  COMPONENT2 = "component2",
  COMPONENT3 = "component3",
  COMPONENT4 = "component4",
}

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.COMPONENT4
  );

  const role = useSelector(getRole);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleComponentChange = (component: ActiveComponent) => {
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case ActiveComponent.COMPONENT1:
        return <Component1 />;
      case ActiveComponent.COMPONENT2:
        return <Component2 filterRole={""} />;
      case ActiveComponent.COMPONENT3:
        return <Component3 />;
      case ActiveComponent.COMPONENT4:
        return <Component4 />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.accountContainer}>
      <div className={styles.buttonContainer}>
        {role === "admin" && (
          <>
            <button
              className={`${styles.button} ${
                activeComponent === ActiveComponent.COMPONENT4
                  ? styles.activeButton
                  : ""
              }`}
              onClick={() => handleComponentChange(ActiveComponent.COMPONENT4)}>
              <HiMiniChartBar className={styles.icon} /> Statistic
            </button>
            <button
              className={`${styles.button} ${
                activeComponent === ActiveComponent.COMPONENT1
                  ? styles.activeButton
                  : ""
              }`}
              onClick={() => handleComponentChange(ActiveComponent.COMPONENT1)}>
              <HiMiniShoppingCart className={styles.icon} /> Product
            </button>
            <button
              className={`${styles.button} ${
                activeComponent === ActiveComponent.COMPONENT2
                  ? styles.activeButton
                  : ""
              }`}
              onClick={() => handleComponentChange(ActiveComponent.COMPONENT2)}>
              <HiUsers className={styles.icon} />
              Profiles
            </button>
            <button
              className={`${styles.button} ${
                activeComponent === ActiveComponent.COMPONENT3
                  ? styles.activeButton
                  : ""
              }`}
              onClick={() => handleComponentChange(ActiveComponent.COMPONENT3)}>
              <HiMiniFaceFrown className={styles.icon} /> Tradings
            </button>
          </>
        )}

        {role === "moderator" && (
          <>
            <button
              className={`${styles.button} ${
                activeComponent === ActiveComponent.COMPONENT1
                  ? styles.activeButton
                  : ""
              }`}
              onClick={() => handleComponentChange(ActiveComponent.COMPONENT1)}>
              <HiMiniShoppingCart className={styles.icon} /> Product
            </button>
            <button
              className={`${styles.button} ${
                activeComponent === ActiveComponent.COMPONENT3
                  ? styles.activeButton
                  : ""
              }`}
              onClick={() => handleComponentChange(ActiveComponent.COMPONENT3)}>
              <HiMiniFaceFrown className={styles.icon} /> Tradings
            </button>
          </>
        )}
      </div>

      {renderActiveComponent()}
    </div>
  );
};

export default AdminPanel;
