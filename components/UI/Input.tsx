import React from "react";
import styles from "../../styles/components/UI/Input.module.css";

interface InputProps {
  type: string | any;
  placeholder: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string; // Добавьте свойство className здесь
  onFocus?: () => void; // Добавьте свойство onFocus
  onBlur?: () => void; // Добавьте свойство onBlur
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onFocus,
  onBlur,
  onChange,
  className,
}) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default Input;
