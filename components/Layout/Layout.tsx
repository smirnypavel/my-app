import React from "react";
import Navigation from "../Navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto  border rounded-md ">
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
