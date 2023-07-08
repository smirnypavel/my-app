import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import login from "../pages/auth/login"; // Замените на вашу страницу входа

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login"); // Перенаправляем на страницу входа, если пользователь не авторизован
      toast.error("you need to log in");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

export default PrivateRoute;
