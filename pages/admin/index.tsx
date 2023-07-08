import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminPanel from "../../components/Moderator/AdminPanel";
import ModerateLayout from "../../components/Moderator/ModerateLoyout";
import PrivateRoute from "../../redux/PrivateRoute";
import ProtectedRoute from "../../redux/ProtectedRoute";

const AdminPage = () => {
  return (
    <PrivateRoute>
      <ProtectedRoute>
        <Layout>
          <ModerateLayout>
            <AdminPanel />
          </ModerateLayout>
        </Layout>
      </ProtectedRoute>
    </PrivateRoute>
  );
};

export default AdminPage;
