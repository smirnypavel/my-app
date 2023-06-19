import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

enum AuthMode {
  LOGIN = "login",
  REGISTRATION = "registration",
}

const AuthToggle: React.FC = () => {
  const [mode, setMode] = useState(AuthMode.LOGIN);

  const toggleMode = () => {
    setMode((prevMode) =>
      prevMode === AuthMode.LOGIN ? AuthMode.REGISTRATION : AuthMode.LOGIN
    );
  };

  return (
    <div>
      <button onClick={toggleMode}>
        {mode === AuthMode.LOGIN ? " Registration" : "Login"}
      </button>
      {mode === AuthMode.LOGIN ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthToggle;
