import React from "react";
import Layout from "../components/Layout/Layout";
import AuthToggle from "../components/AuthForm/AuthToggle";

const AuthPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <AuthToggle />
      </div>
    </Layout>
  );
};

export default AuthPage;
