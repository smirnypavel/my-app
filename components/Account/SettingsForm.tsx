import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/components/Account/SettingsForm.module.css";
import { updateUser } from "../../redux/auth/authOperations";

const SettingsForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      updateUser({
        firstName,
        lastName,
        avatarURL,
        phone,
        location,
        isOnline,
      })
    );
    router.push("/account");
    // Handle form submission
  };

  return (
    <form
      className={styles.settingsForm}
      onSubmit={handleSubmit}>
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <input
        name="lastName"
        type="text"
        placeholder="LastName"
        value={lastName}
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />

      <input
        name="avatarURL"
        type="text"
        placeholder="avatarURL"
        value={avatarURL}
        onChange={(event) => {
          setAvatarURL(event.target.value);
        }}
      />
      <input
        name="phone"
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
      <input
        name="location"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <label style={{ textAlign: "center" }}>isOnline?</label>
      <input
        name="isOnline"
        type="checkbox"
        checked={isOnline}
        onChange={(event) => {
          setIsOnline(event.target.checked);
        }}
      />
      {/* Additional account settings form fields */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default SettingsForm;
