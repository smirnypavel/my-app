import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../../styles/components/Account/ChangePassword.module.css";
import Button from "../UI/Button";
import axios from "axios";
import { toast } from "react-hot-toast";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  const initialValues: FormValues = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (values.newPassword !== values.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
    }

    if (values.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const handleSubmit = async (values: FormValues) => {
    const changePassword = async () => {
      const requestBody = {
        oldPassword: values.oldPassword,
        password: values.newPassword,
      };

      try {
        await axios.patch("/auth/change-password/", requestBody);
        toast.success("You have successfully changed your password!");
      } catch (error) {
        console.log("Error:", error);
      }
    };

    await changePassword();
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className={styles.changePasswordWrapper}>
      <h4>Change your password</h4>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <Field
              type="string"
              name="oldPassword"
              placeholder="old password"
              className={styles.input}
            />
            <Field
              type="password"
              name="newPassword"
              placeholder="new password"
              className={`${styles.input} ${
                touched.newPassword &&
                touched.repeatPassword &&
                (errors.newPassword || errors.repeatPassword)
                  ? styles.unmatched
                  : ""
              } ${
                touched.newPassword &&
                touched.repeatPassword &&
                !errors.newPassword &&
                !errors.repeatPassword
                  ? styles.matched
                  : ""
              }`}
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className={`${styles.error} ${styles.errorMessage}`}
            />

            <Field
              type="password"
              name="repeatPassword"
              placeholder="repeat new password"
              className={`${styles.input} ${
                touched.newPassword &&
                touched.repeatPassword &&
                errors.repeatPassword
                  ? styles.unmatched
                  : ""
              } ${
                touched.newPassword &&
                touched.repeatPassword &&
                !errors.repeatPassword &&
                !errors.newPassword
                  ? styles.matched
                  : ""
              }`}
            />
            <ErrorMessage
              name="repeatPassword"
              component="div"
              className={`${styles.error} ${styles.errorMessage}`}
            />

            <div className={styles.buttonWrapper}>
              {" "}
              <Button type="submit">Change password</Button>
              <Button onClick={handleCloseModal}>Exit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
