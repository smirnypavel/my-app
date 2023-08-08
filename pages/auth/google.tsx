import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAppDispatch } from "../../redux/hooks";
import { googleAuth } from "../../redux/auth/authOperations";
import { useSelector } from "react-redux";
import { isLoading } from "../../redux/auth/authSelectors";

const GoogleAuthComponent = () => {
  const dispatch = useAppDispatch();
  const isLoadding = useSelector(isLoading);

  const handleGoogleAuth = () => {
    dispatch(googleAuth());
  };

  return (
    <div>
      <button
        onClick={handleGoogleAuth}
        disabled={isLoadding}>
        {isLoadding ? "Logging in..." : "Log in with Google"}
      </button>
    </div>
  );
};
export default GoogleAuthComponent;
