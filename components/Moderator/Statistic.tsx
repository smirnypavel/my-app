import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUserAuth } from "../../redux/auth/authReducer";
import UsersList from "../../components/Moderator/moderateProfile";

import styles from "../../styles/components/Moderator/Statistic.module.css";

const Statistic: React.FC = () => {
  const [users, setUsers] = useState<IUserAuth[]>([]);
  const [quantityModerator, setQuantityModerator] = useState<number>(0);
  const [quantityAdmin, setQuantityAdmin] = useState<number>(0);
  const [quantityUsers, setQuantityUsers] = useState<number>(0);
  const [quantityUsersBan, setQuantityUsersBan] = useState<number>(0);
  const [showUsersList, setShowUsersList] = useState(false);
  const [filterRole, setFilterRole] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const countModerators = users.filter(
      (user) => user.role === "moderator"
    ).length;
    setQuantityModerator(countModerators);
    const countAdmin = users.filter((user) => user.role === "admin").length;
    setQuantityAdmin(countAdmin);
    const countUsers = users.filter((user) => user.role === "user").length;
    setQuantityUsers(countUsers);
    const countUsersBan = users.filter((user) => user.ban === true).length;
    setQuantityUsersBan(countUsersBan);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleViewClick = (role: string, index: number) => {
    setFilterRole(role);
    setShowUsersList(true);
    setActiveIndex(index);
  };
  const isFilterActive = (index: number) => {
    return index === activeIndex ? styles.activeButton : "";
  };

  return (
    <>
      <div>
        <div>Statistic</div>
        <ul className={styles.statUsersList}>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(0)}`}
            onClick={() => handleViewClick("", 0)}>
            <p className={styles.title}>All users: {users.length}</p>
          </li>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(1)}`}
            onClick={() => handleViewClick("moderator", 1)}>
            <p className={styles.title}> Moderators: {quantityModerator}</p>
          </li>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(2)}`}
            onClick={() => handleViewClick("admin", 2)}>
            <p className={styles.title}>Admin: {quantityAdmin}</p>
          </li>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(3)}`}
            onClick={() => handleViewClick("user", 3)}>
            <p className={styles.title}>Users: {quantityUsers}</p>
          </li>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(4)}`}
            onClick={() => handleViewClick("ban", 4)}>
            <p className={styles.title}>Users ban: {quantityUsersBan}</p>
          </li>
        </ul>
        <ul className={styles.statUsersList}>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(5)}`}
            onClick={() => handleViewClick("", 5)}>
            <p className={styles.title}>All posts: {users.length}</p>
          </li>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(6)}`}
            onClick={() => handleViewClick("moderator", 6)}>
            <p className={styles.title}> new posts: {quantityModerator}</p>
          </li>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(7)}`}
            onClick={() => handleViewClick("admin", 7)}>
            <p className={styles.title}>Publish posts: {quantityAdmin}</p>
          </li>
          <li
            className={`${styles.statUsersCard} ${isFilterActive(8)}`}
            onClick={() => handleViewClick("user", 8)}>
            <p className={styles.title}>ban posts: {quantityUsers}</p>
          </li>
        </ul>
        <ul>{showUsersList && <UsersList filterRole={filterRole} />}</ul>
      </div>
    </>
  );
};

export default Statistic;
