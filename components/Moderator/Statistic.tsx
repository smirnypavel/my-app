import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUserAuth } from "../../types/IAuth";
import { IPosts } from "../../types/IPost";
import UsersList from "../../components/Moderator/moderateProfile";
import styles from "../../styles/components/Moderator/Statistic.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import ModerateProduct from "./moderateProductStat";

const Statistic: React.FC = () => {
  const [users, setUsers] = useState<IUserAuth[]>([]);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [quantityModerator, setQuantityModerator] = useState<number>(0);
  const [quantityAdmin, setQuantityAdmin] = useState<number>(0);
  const [quantityUsers, setQuantityUsers] = useState<number>(0);
  const [quantityUsersBan, setQuantityUsersBan] = useState<number>(0);
  // const [quantityAllPost, setQuantityAllPost] = useState<number>(0);
  const [quantityPublishPosts, setQuantityPublishPosts] = useState<number>(0);
  const [quantityNewPosts, setQuantityNewPosts] = useState<number>(0);
  const [quantityPostBan, setQuantityUPostBan] = useState<number>(0);
  const [showUsersList, setShowUsersList] = useState(false);
  const [filterRole, setFilterRole] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const isLogIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLogIn) {
      fetchUsers();
      fetchProduct();
    }
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

    const countNewPosts = posts.filter((post) => post.verify === "new").length;
    setQuantityNewPosts(countNewPosts);
    const countPublishPosts = posts.filter(
      (post) => post.verify === "approve"
    ).length;
    setQuantityAdmin(countPublishPosts);
    const countPostsBan = posts.filter(
      (post) => post.verify === "rejected"
    ).length;
    setQuantityUPostBan(countPostsBan);
  }, [users, posts]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      // Обработка ошибки
      console.log("An error occurred:", error);
      // Дополнительные действия, например, установка состояния ошибки или вывод сообщения пользователю
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await axios.get("/posts/all");
      setPosts(response.data);
    } catch (error) {
      // Обработка ошибки
      console.log("An error occurred:", error);
      // Дополнительные действия, например, установка состояния ошибки или вывод сообщения пользователю
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
      <div className={styles.statContainer}>
        <h2 className={styles.statTitle}>Statistics</h2>
        <div className={styles.statBox}>
          <h6 className={styles.categoryTitle}>User statistic:</h6>
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
        </div>
        <div className={styles.statBox}>
          <h6 className={styles.categoryTitle}>Posts statistic:</h6>

          <ul className={styles.statUsersList}>
            <li
              className={`${styles.statUsersCard} ${isFilterActive(5)}`}
              onClick={() => handleViewClick("", 5)}>
              <p className={styles.title}>All posts: {posts.length}</p>
            </li>
            <li
              className={`${styles.statUsersCard} ${isFilterActive(6)}`}
              onClick={() => handleViewClick("new", 6)}>
              <p className={styles.title}> new posts: {quantityNewPosts}</p>
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
        </div>
        <ul>{showUsersList && <UsersList filterRole={filterRole} />}</ul>
        {/* <ul>{showUsersList && <ModerateProduct postsStat={filterRole} />}</ul> */}
      </div>
    </>
  );
};

export default Statistic;
