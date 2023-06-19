import React from "react";
import styles from "../../styles/components/Account/SettingsForm.module.css";

const SettingsForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <form
      className={styles.settingsForm}
      onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
      />
      <input
        type="email"
        placeholder="Email"
      />
      {/* Additional account settings form fields */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default SettingsForm;
