import React from "react";
import Link from "next/link";
import styles from "../../styles/components/AuthForm.module.css";

const RegisterForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <form className={styles.form}>
      <p className={styles.title}>Register</p>
      <p className={styles.message}>
        Signup now and get full access to our app.
      </p>
      <div className={styles.flex}>
        <label>
          <input
            required
            placeholder=""
            type="text"
            className={styles.input}
          />
          <span>Firstname</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="text"
            className={styles.input}
          />
          <span>Lastname</span>
        </label>
      </div>

      <label>
        <input
          required
          placeholder=""
          type="email"
          className={styles.input}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="password"
          className={styles.input}
        />
        <span>Password</span>
      </label>
      <label>
        <input
          required
          placeholder=""
          type="password"
          className={styles.input}
        />
        <span>Confirm password</span>
      </label>
      <button
        className={styles.submit}
        onClick={handleSubmit}>
        Submit
      </button>
      <p className={styles.signin}>
        Already have an account?{" "}
        <Link
          className={styles.link}
          href="./login">
          LogIn
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
