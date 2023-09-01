import React, { MouseEvent } from "react";
import styles from "../../styles/components/UI/Button.module.css";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // Add this line to include the disabled prop
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}>
      {" "}
      {/* Pass the disabled prop to the button */}
      {children}
    </button>
  );
};

export default Button;
