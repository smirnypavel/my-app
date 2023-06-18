import React from "react";
import Layout from "../../components/Layout/Layout";
import LogIn from "../../components/Auth/Login/LogIn";
import Registry from "../../components/Auth/Registry/Registry";

export default function Login() {
  return (
    <Layout>
      <LogIn />
      <Registry />
    </Layout>
  );
}
