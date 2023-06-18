import React from "react";
import Layout from "../../components/Layout/Layout";
import LogIn from "../../components/Auth/Login/Login";
import Registry from "../../components/Auth/Registy/Registry";

export default function Login() {
  return (
    <Layout>
      <LogIn />
      <Registry />
    </Layout>
  );
}
