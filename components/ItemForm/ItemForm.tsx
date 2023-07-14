import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createPost } from "../../redux/posts/postsOperations";
import styles from "../../styles/components/ItemForm.module.css";

const ItemForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createPost({ title, description }));
    // Handle form submission
  };

  return (
    <form
      className={styles.itemForm}
      onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Additional item form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
