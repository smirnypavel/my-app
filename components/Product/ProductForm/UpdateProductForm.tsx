import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "../../../redux/hooks";
import { updatePost } from "../../../redux/posts/postsOperations";
import styles from "../../../styles/components/Product/CreateProductForm.module.css";
import productNotFound from "../../../public/productNotFound.jpeg";
import { useSelector } from "react-redux";
import { getPost } from "../../../redux/posts/postsSelectors";
import { useRouter } from "next/router";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

const cloudName = "dvt0czglz";
const uploadPreset = "eqykdqjy";

const UpdateItemForm: React.FC<{ productId: string }> = ({ productId }) => {
  const router = useRouter();
  const post = useSelector(getPost);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(post.title || ""); // По умолчанию строка
  const [description, setDescription] = useState(post?.description || ""); // По умолчанию строка
  const [location, setLocation] = useState(post?.location || ""); // По умолчанию строка
  const [price, setPrice] = useState<number>(post?.price || 0); // По умолчанию число
  const [img, setImg] = useState<string>(post?.img || ""); // По умолчанию строка
  const [verify, setVerify] = useState<string>("new"); // По умолчанию строка

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(
        updatePost({
          productId,
          credentials: { title, description, location, price, img, verify },
        })
      );
      router.push(`/product/${productId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle any error that occurred during the form submission
    }
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPrice = Number(event.target.value);
    setPrice(inputPrice);
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
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <h1 className={styles.settingsFormTitle}>Update Product</h1>

      <div className={styles.settingsFormContainer}>
        <button
          onClick={handleBack}
          className={styles.backButton}>
          {" <<< "} Back
        </button>
        <div className={styles.imageContainer}>
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
            type="number"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
          />
          <textarea
            className={styles.productDescription}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default UpdateItemForm;
