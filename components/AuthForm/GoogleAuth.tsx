import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { googleAuth } from "../../redux/auth/authOperations";
import { useAppDispatch } from "../../redux/hooks";

export const GoogleAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const authenticateWithGoogle = async () => {
      try {
        if (typeof id === "string") {
          await dispatch(googleAuth(id));
        }
      } catch (error) {
        console.error("Ошибка при входе:", error);
      }
    };

    if (id) {
      authenticateWithGoogle();
    }
  }, [id]);

  return <></>;
};
