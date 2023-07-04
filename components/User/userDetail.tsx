import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { getUser } from "../../redux/moderate/moderateOperations";
import { IModerateState } from "../../redux/moderate/moderateReducer";

interface UserDetailProps {
  userId: string;
}

const UserDetail: React.FC<UserDetailProps> = ({ userId }) => {
  const [userDetail, setUserDetail] = useState<IModerateState | undefined>();
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <p>{userDetail?.user?.firstName}</p>
    </div>
  );
};

export default UserDetail;
