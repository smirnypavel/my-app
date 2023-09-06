import React, { useEffect, useState } from "react";
import styles from "../../styles/components/Layout/LanguageSwitcher.module.css";
import axios from "axios";

interface CategorySwitcherProps {
  onCategoryChange: (item: string) => void; // Принимаем функцию обратного вызова в качестве prop
}

const CategorySwitcher: React.FC<CategorySwitcherProps> = ({
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/posts/category`);
        setCategory(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryChange = (item: string) => {
    setIsOpen(false);
    // Вызовите функцию обратного вызова с выбранным элементом
    onCategoryChange(item);
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.switcherContainer}>
      <button
        onClick={toggleDropdown}
        className={styles.toggleButton}>
        Category
      </button>
      {isOpen && (
        <div className={styles.toggleWrapper}>
          {category.map((item) => (
            <button
              key={item}
              onClick={() => handleCategoryChange(item)}
              className={styles.toggleButton}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySwitcher;
