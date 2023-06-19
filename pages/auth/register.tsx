import React from "react";
import Layout from "../../components/Layout/Layout";
import RegisterForm from "../../components/AuthForm/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <h1>Register</h1>
      <RegisterForm />
    </Layout>
  );
};

export default RegisterPage;
