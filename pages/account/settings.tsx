import React from "react";
import Layout from "../../components/Layout/Layout";
import SettingsForm from "../../components/Account/SettingsForm";
import PrivateRoute from "../../redux/PrivateRoute";

const SettingsPage: React.FC = () => {
  return (
    <PrivateRoute>
      <Layout>
        <SettingsForm />
      </Layout>
    </PrivateRoute>
  );
};

export default SettingsPage;
