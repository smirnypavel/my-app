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

  const handleViewClick = (role: string) => {
    setFilterRole(role);
    setShowUsersList(true);
  };

  return (
    <>
      <div>
        <div>Statistic</div>
        <ul className={styles.statUsersList}>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("")} // Пустая строка в качестве фильтра для "All users"
          >
            <p className={styles.title}>All users: {users.length}</p>
          </li>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("moderator")} // Фильтр по модераторам
          >
            <p className={styles.title}> Moderators: {quantityModerator}</p>
          </li>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("admin")} // Фильтр по админам
          >
            <p className={styles.title}>Admin: {quantityAdmin}</p>
          </li>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("user")} // Фильтр по админам
          >
            <p className={styles.title}>Users: {quantityUsers}</p>
          </li>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("ban")} // Фильтр по админам
          >
            <p className={styles.title}>Users ban: {quantityUsersBan}</p>
          </li>
        </ul>
        <ul className={styles.statUsersList}>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("")} // Пустая строка в качестве фильтра для "All users"
          >
            <p className={styles.title}>All posts: {users.length}</p>
          </li>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("moderator")} // Фильтр по модераторам
          >
            <p className={styles.title}>new posts: {quantityModerator}</p>
          </li>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("admin")} // Фильтр по админам
          >
            <p className={styles.title}>publish posts: {quantityAdmin}</p>
          </li>
          <li
            className={styles.statUsersCard}
            onClick={() => handleViewClick("user")} // Фильтр по админам
          >
            <p className={styles.title}>ban posts {quantityUsers}</p>
          </li>
        </ul>
        <ul>{showUsersList && <UsersList filterRole={filterRole} />}</ul>
      </div>
    </>
  );
};

export default Statistic;
