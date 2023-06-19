import React from "react";
import styles from "../../styles/components/AuthForm.module.css";
// import Button from "../UI/Button";

const LoginForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}>
        <p className={styles.heading}>LOGIN</p>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <button
          className={styles.btn}
          type="submit">
          Login
        </button>
      </form>
      {/* <form class="form">
    <p class="heading">LOGIN</p>
    <input placeholder="Username" class="input" type="text">
    <input placeholder="Password" class="input" type="password">
    <button class="btn">Submit</button>
</form> */}
    </>
  );
};

export default LoginForm;
