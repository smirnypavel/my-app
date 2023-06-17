import React from "react";
import Layout from "../../components/Layout/Layout";
import UserInfo from "../../components/User/UserInfo";
import LayoutUser from "../../components/UserNavigation/LayoutUser";

export default function userPage() {
  return (
    <Layout>
      <div className=" flex ">
        <LayoutUser>{/* <div>userPage</div> */}</LayoutUser>
        <UserInfo />
      </div>
    </Layout>
  );
}
