import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getRole } from "../redux/auth/authSelectors";
import { toast } from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const userRole = useSelector(getRole);

  useEffect(() => {
    // Проверяем права доступа пользователя
    if (userRole !== "admin" && userRole !== "moderator") {
      // Если у пользователя нет необходимых прав доступа, перенаправляем его на другую страницу
      router.push("/auth/login");

      // Показываем toast сообщение об ошибке
      toast.error("У вас нет доступа к этой странице.");
    }
  }, [userRole, router]);

  if (userRole !== "admin" && userRole !== "moderator") {
    return null; // Можно также вернуть пустой компонент
  }

  return <>{children}</>;
};

export default ProtectedRoute;
