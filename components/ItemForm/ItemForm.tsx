import React from "react";
import styles from "../../styles/components/ItemForm.module.css";

const ItemForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <form
      className={styles.itemForm}
      onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
      />
      <textarea placeholder="Description" />
      {/* Additional item form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
