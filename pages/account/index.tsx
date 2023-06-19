import React from "react";
import Layout from "../../components/Layout/Layout";
import Profile from "../../components/Account/Profile";

const AccountPage: React.FC = () => {
  return (
    <Layout>
      <h1>Account</h1>
      <Profile />
    </Layout>
  );
};

export default AccountPage;
