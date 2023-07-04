import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IUserAuth } from "../../redux/auth/authReducer";
import { useAppDispatch } from "../../redux/hooks";
import { getUserById } from "../../redux/moderate/moderateOperations";
import { getUserSelect } from "../../redux/moderate/moderateSelector";

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
      <p>{user.firstName}</p>
    </div>
  );
};

export default UserDetail;
