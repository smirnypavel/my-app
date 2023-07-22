import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "next/router";
import styles from "../../styles/components/Account/SettingsForm.module.css";
import { updateUser } from "../../redux/auth/authOperations";
import { IUserAuth } from "../../redux/auth/authReducer";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/auth/authSelectors";
import Button from "../UI/Button";
import Input from "../UI/Input";

const cloudName = "dvt0czglz";
const uploadPreset = "eqykdqjy";

const SettingsForm: React.FC = () => {
  const user: IUserAuth = useSelector(getUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  // const [isOnline, setIsOnline] = useState(false);
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

    const updatedUser: Partial<IUserAuth> = {}; // Создаем пустой объект

    // Проверяем каждое поле и добавляем только непустые значения в объект updatedUser
    if (firstName) {
      updatedUser.firstName = firstName;
    }
    if (lastName) {
      updatedUser.lastName = lastName;
    }
    if (phone) {
      updatedUser.phone = phone;
    }
    if (location) {
      updatedUser.location = location;
    }
    updatedUser.isOnline = isOnline;

    dispatch(updateUser(updatedUser));
    router.push("/account");
  };

  return (
    <>
      <h1 className={styles.settingsFormTitle}>Change your Profile</h1>
      <div className={styles.settingsFormContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={user.avatarURL}
              alt="avatar"
              width={200}
              height={250}
              style={{
                objectFit: "cover",
                margin: "auto",
              }}
            />
          </div>
          <label
            htmlFor="fileInput"
            className={styles.imageButton}>
            Upload photo
          </label>
          <input
            id="fileInput"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className={styles.hiddenInput}
          />
        </div>
        <form
          className={styles.settingsForm}
          onSubmit={handleSubmit}>
          <Input
            name="firstName"
            type="text"
            placeholder={firstName ? firstName : "First Name"}
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />

          <Input
            name="lastName"
            type="text"
            placeholder={lastName ? lastName : "Last Name"}
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />

          <Input
            name="phone"
            type="text"
            placeholder={phone ? phone : "Phone"}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />

          <Input
            name="location"
            type="text"
            placeholder={location ? location : "Location"}
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </>
  );
};

export default SettingsForm;
