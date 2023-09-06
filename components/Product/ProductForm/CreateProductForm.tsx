import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { useAppDispatch } from "../../../redux/hooks";
import { createPost } from "../../../redux/posts/postsOperations";
import styles from "../../../styles/components/Product/CreateProductForm.module.css";
import productNotFound from "../../../public/productNotFound.jpeg";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useRouter } from "next/router";
import axios from "axios";
import CategorySwitcher from "../../LanguageSwitcher/CategorySwitcher";

const cloudName = "dvt0czglz";
const uploadPreset = "eqykdqjy";

const ItemForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();
  const [category, setCategory] = useState("Category"); // Состояние для хранения выбранной категории

  // Функция обратного вызова для обновления выбранной категории
  const handleCategoryChange = (item: string) => {
    setCategory(item);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      createPost({ title, description, location, price, img, category })
    );
    router.push("/account/my-product");
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

  const productImg = img || productNotFound;

  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <h1 className={styles.settingsFormTitle}>Create Product</h1>
      <div className={styles.settingsFormContainer}>
        <button
          onClick={handleBack}
          className={styles.backButton}>
          {" <<< "} Back
        </button>
        <div className={styles.imageContainer}>
          <div>
            <CategorySwitcher onCategoryChange={handleCategoryChange} />
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={productImg}
              alt="product image"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{
                objectFit: "cover",
                margin: "auto",
              }}
              priority
              className={styles.image}
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
          <p>{category}</p>
          <Input
            type="string"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="string"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="string"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            className={styles.productDescription}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Additional item form fields */}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default ItemForm;
