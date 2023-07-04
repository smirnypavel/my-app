import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import UserDetail from "../../components/User/userDetail";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <UserDetail userId={id as string} />
    </Layout>
  );
};

export default UserPage;
