import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import UserDetail from "../../components/User/userDetail";
// import ModerateLayout from "../../components/Moderator/ModerateLoyout";
import PrivateRoute from "../../redux/PrivateRoute";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PrivateRoute>
      <Layout>
        <UserDetail userId={id as string} />
      </Layout>
    </PrivateRoute>
  );
};

export default UserPage;
