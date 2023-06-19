import React from "react";
import Layout from "../../components/Layout/Layout";
import SettingsForm from "../../components/Account/SettingsForm";

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <h1>Account Settings</h1>
      <SettingsForm />
    </Layout>
  );
};

export default SettingsPage;
