import React from "react";
import Layout from "../../components/Layout/Layout";
import LoginForm from "../../components/AuthForm/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <h1>Login</h1>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
