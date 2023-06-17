import React from "react";
import UserNavigation from "./UserNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutUser: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <UserNavigation />
      <main>{children}</main>
    </div>
  );
};

export default LayoutUser;
