import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserListItem } from "./userListItem";
import { IUserAuth } from "../../types/IAuth";
import styles from "../../styles/components/Moderator/moderateProfile.module.css";
interface Props {
  filterRole: string; // Типизация параметра filterRole
}

const ModerateProfile: React.FC<Props> = ({ filterRole }) => {
  const [users, setUsers] = useState<IUserAuth[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin");
        setUsers(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <p>Список профилей пуст</p>
      ) : (
        <ul>
          {users.map((item: IUserAuth) => {
            if (filterRole === "" || item.role === filterRole) {
              return (
                <li
                  key={item._id}
                  className={styles.list}>
                  <UserListItem item={item} />
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </>
  );
};

export default ModerateProfile;
