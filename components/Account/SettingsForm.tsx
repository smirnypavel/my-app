import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/components/Account/SettingsForm.module.css";
import { updateUser } from "../../redux/auth/authOperations";
import { IUserAuth } from "../../redux/auth/authReducer";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/auth/authSelectors";

const cloudName = "dvt0czglz";
const uploadPreset = "eqykdqjy";

const SettingsForm: React.FC = () => {
  const user: IUserAuth = useSelector(getUser);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [avatarURL, setAvatarURL] = useState(user.avatarURL);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files;

    if (file && file.length > 0) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          if (typeof reader.result === "string") {
            const imageUrl = await uploadImageToCloudinary(reader.result);
            setAvatarURL(imageUrl.secure_url);
            sendImageUrlToBackend(imageUrl.secure_url);
          } else {
            throw new Error("Invalid file type");
          }
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
        }
      };
      reader.readAsDataURL(file[0]);
    }
  };

  const uploadImageToCloudinary = async (imageUrl: string | Blob) => {
    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error uploading image to Cloudinary");
    }

    return response.json();
  };

  const sendImageUrlToBackend = (imageUrl: string) => {
    dispatch(updateUser({ avatarURL: imageUrl }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      updateUser({
        firstName,
        lastName,
        phone,
        location,
        isOnline,
      })
    );
    router.push("/account");
  };

  return (
    <>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={user.avatarURL}
            alt="avatar"
            width={150}
            height={200}
            style={{
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </div>
        <input
          id="fileInput"
          name="photo"
          type="file"
          placeholder="First Name"
          onChange={handleFileInputChange}
        />
      </div>
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
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />

        {/* <input
          name="avatarURL"
          type="text"
          placeholder="Avatar URL"
          value={avatarURL}
          onChange={(event) => {
            setAvatarURL(event.target.value);
          }}
        /> */}
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
        <label style={{ textAlign: "center" }}>Is Online?</label>
        <input
          name="isOnline"
          type="checkbox"
          checked={isOnline}
          onChange={(event) => {
            setIsOnline(event.target.checked);
          }}
        />
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
};

export default SettingsForm;
