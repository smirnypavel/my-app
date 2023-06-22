import React from "react";
import LoginForm from "../../components/AuthForm/LoginForm";

import Layout from "../../components/Layout/Layout";

export default function login() {
  return (
    <>
      <Layout>
        <LoginForm />
      </Layout>
    </>
  );
}
