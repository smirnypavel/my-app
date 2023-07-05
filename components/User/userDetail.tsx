import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IUserAuth } from "../../redux/auth/authReducer";
import { useAppDispatch } from "../../redux/hooks";
import { getUserById } from "../../redux/moderate/moderateOperations";
import { getUserSelect } from "../../redux/moderate/moderateSelector";
import styles from "../../styles/components/User/UserDetail.module.css";

interface UserDetailProps {
  userId: string;
}

const UserDetail: React.FC<UserDetailProps> = ({ userId }) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const user: IUserAuth = useSelector(getUserSelect);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getUserById(id));
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // или любой другой индикатор загрузки
  }

  return (
    <div>
      <div className={styles.imageWrapper}>
        <Image
          src={user.avatarURL}
          alt="avatar"
          width={150}
          height={200}
          style={{
            objectFit: "cover",
            margin: "auto",
          }}
        />
      </div>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.email}</p>
      <p>{user.isOnline}</p>
      <p>{user.location}</p>
      <p>{user.phone}</p>
      <p>{user.role}</p>
      <p>{user.createdAt}</p>
      <p>список обьявлений</p>
    </div>
  );
};

export default UserDetail;
