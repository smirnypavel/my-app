import React from "react";
import styles from "../../styles/components/UI/Input.module.css";

interface InputProps {
  type: "string" | "number"; // Тип значения может быть только "string" или "number"
  placeholder: string;
  value?: string | number; // Значение может быть типа "string" или "number"
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
