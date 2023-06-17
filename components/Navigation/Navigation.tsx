import React from "react";
import Link from "next/link";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-slate-600   rounded-md   ">
      <ul className="flex justify-between p-4">
        <li>
          <Link
            href="/"
            className="text-red-500">
            Home
          </Link>
        </li>
        <li>
          <Link href="/user">User</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
