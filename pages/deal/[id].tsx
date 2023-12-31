import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import PrivateRoute from "../../redux/PrivateRoute";
import DealsDetail from "../../components/Deals/DealsDetail";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PrivateRoute>
      <Layout>
        <DealsDetail dealId={id as string} />
      </Layout>
    </PrivateRoute>
  );
};

export default UserPage;
