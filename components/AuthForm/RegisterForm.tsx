import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/components/AuthForm.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { signUp, signIn } from "../../redux/auth/authOperations";

const RegisterForm: React.FC = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const singUpResp = await dispatch(signUp({ email, password }));
      if (!singUpResp) {
        return;
      }
      await dispatch(signIn({ email, password }));
      router.push("/account/settings");
    } catch (error) {
      // console.error('Error logging in:', error);
    }
    // Handle form submission
  };

  const handleChangeFirstname = (event: { target: { value: string } }) => {
    const firstName = event.target.value;
    setFirstname(firstName);
  };
  const handleChangeLastname = (event: { target: { value: string } }) => {
    const lastName = event.target.value;
    setLastName(lastName);
  };
  const handleChangeEmail = (event: { target: { value: string } }) => {
    const email = event.target.value;
    setEmail(email);
  };
  const handleChangePasword = (event: { target: { value: string } }) => {
    const password = event.target.value;
    setPassword(password);
  };
  const handleChangeConfirmPassword = (event: {
    target: { value: string };
  }) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}>
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
            value={firstName}
            onChange={handleChangeFirstname}
          />
          <span>Firstname</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="text"
            className={styles.input}
            value={lastName}
            onChange={handleChangeLastname}
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
          value={email}
          onChange={handleChangeEmail}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="password"
          className={styles.input}
          value={password}
          onChange={handleChangePasword}
        />
        <span>Password</span>
      </label>
      <label>
        <input
          required
          placeholder=""
          type="password"
          className={styles.input}
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
        />
        <span>Confirm password</span>
      </label>
      <button
        className={styles.submit}
        type="submit">
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
