import React from "react";
import AccountPage from "../../components/Account/AcountPage";
import Layout from "../../components/Layout/Layout";
import PrivateRoute from "../../redux/PrivateRoute";

const Account: React.FC = () => {
  return (
    <PrivateRoute>
      <Layout>
        <AccountPage />
      </Layout>
    </PrivateRoute>
  );
};

export default Account;
