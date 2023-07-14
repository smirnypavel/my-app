import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import { useAppDispatch } from "../../../redux/hooks";
import { createPost } from "../../../redux/posts/postsOperations";
import styles from "../../../styles/components/ItemForm.module.css";
import productNotFound from "../../../public/productNotFound.jpeg";

const cloudName = "dvt0czglz";
const uploadPreset = "eqykdqjy";

const ItemForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createPost({ title, description, location, price, img }));
    // Handle form submission
  };
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
            setImg(imageUrl.secure_url);
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
  const productImg = img || productNotFound; // Используйте productNotFound, если avatarURL не определен

  return (
    <>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={productImg}
            alt="product image"
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
        className={styles.itemForm}
        onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Additional item form fields */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ItemForm;
