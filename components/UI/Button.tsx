import React, { MouseEvent } from "react";
import styles from "../../styles/components/UI/Button.module.css";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
