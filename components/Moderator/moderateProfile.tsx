import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/auth/authSelectors";
import { UserListItem } from "./userListItem";
import { IUserAuth } from "../../redux/auth/authReducer";
import styles from "../../styles/components/Moderator/moderateProfile.module.css";

const ModerateProfile = () => {
  const [users, setUsers] = useState<IUserAuth[]>([]);
  const { token } = useSelector(getUser);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    const url = "https://test-server-thing.onrender.com/users/";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
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
