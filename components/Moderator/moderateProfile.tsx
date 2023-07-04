import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserListItem } from "./userListItem";
import { IUserAuth } from "../../redux/auth/authReducer";
import styles from "../../styles/components/Moderator/moderateProfile.module.css";

const ModerateProfile = () => {
  const [users, setUsers] = useState<IUserAuth[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      {users.length === 0 ? (
        <p>Список профилей пуст</p>
      ) : (
        <ul>
          {users.map((item: IUserAuth) => (
            <li
              key={item._id}
              className={styles.list}>
              <UserListItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ModerateProfile;
