import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminPanel from "../../components/Moderator/AdminPanel";
import ModerateLayout from "../../components/Moderator/ModerateLoyout";

const AdminPage = () => {
  return (
    <Layout>
      <ModerateLayout>
        <AdminPanel />
      </ModerateLayout>
    </Layout>
  );
};

export default AdminPage;
