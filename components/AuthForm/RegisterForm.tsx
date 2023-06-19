import React from "react";
import styles from "../../styles/components/AuthForm.module.css";

const RegisterForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}>
      <p className={styles.heading}>REGISTRATION</p>
      <input
        type="text"
        placeholder="Name"
        className={styles.input}
      />
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
      {/* Additional registration form fields */}
      <button
        className={styles.btn}
        type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
