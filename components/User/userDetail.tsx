import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";
import { IUserAuth } from "../../redux/auth/authReducer";
import { useAppDispatch } from "../../redux/hooks";
import {
  banSelect,
  getUserById,
  roleSelect,
} from "../../redux/moderator/moderateOperations";
import { getUserSelect } from "../../redux/moderator/moderateSelector";
import styles from "../../styles/components/User/UserDetail.module.css";
import { getRole } from "../../redux/auth/authSelectors";
import photoNotFound from "../../public/photoNotFound.png";
import CustomDropdown from "../UI/CustomDropdown";
import UserProduct from "./UserProduct";

interface UserDetailProps {
  userId: string;
}

const UserDetail: React.FC<UserDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const user: IUserAuth | null = useSelector(getUserSelect);
  const role = useSelector(getRole);
  const [selectedRole, setSelectedRole] = useState<string>(user?.role || "");
  const [selectedBan, setSelectedBan] = useState("ban");

  const handleRoleChange = (selectedOption: string) => {
    setSelectedRole(selectedOption);
    try {
      if (typeof id === "string" && user) {
        dispatch(roleSelect(user._id));
      }
    } catch (e) {
      return;
    }
  };

  const handleBanChange = (selectedOption: string) => {
    setSelectedBan(selectedOption);
    try {
      if (typeof id === "string" && user) {
        dispatch(banSelect(user._id));
      }
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    try {
      if (typeof id === "string") {
        dispatch(getUserById(id));
      }
    } catch (e) {
      return;
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // или любой другой индикатор загрузки
  }

  const avatarURL = user.avatarURL || photoNotFound; // Используйте photoNotFound, если avatarURL не определен

  return (
    <div>
      <div className={styles.imageWrapper}>
        <Image
          src={avatarURL}
          alt="avatar"
          width={150}
          height={200}
          style={{
            objectFit: "cover",
            margin: "auto",
          }}
          priority
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
      {user.ban ? <p>забанин</p> : <p>разрешенный</p>}
      {role === "admin" && (
        <div className={styles.moderatorContent}>
          <CustomDropdown
            options={["Moderator", "User"]}
            defaultOption={selectedRole}
            onSelect={handleRoleChange}
          />
          <CustomDropdown
            options={["to ban", "not ban"]}
            defaultOption={selectedBan.toString()}
            onSelect={handleBanChange}
          />
        </div>
      )}
      <p>user product list</p>
      {typeof id === "string" && <UserProduct userId={id} />}
    </div>
  );
};

export default UserDetail;
