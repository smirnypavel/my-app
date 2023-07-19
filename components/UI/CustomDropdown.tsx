import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/components/UI/CustomDropdown.module.css";

interface CustomDropdownProps {
  options: string[];
  defaultOption: string;
  onSelect: (option: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  defaultOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={styles["custom-dropdown"]}
      ref={dropdownRef}>
      <div
        className={styles["selected-option"]}
        onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          &#9662;
        </span>
      </div>
      {isOpen && (
        <ul className={styles["options-list"]}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
