import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addPostComment,
  getPostById,
  updatePostStatus,
} from "../../../redux/posts/postsOperations";
import { getPost } from "../../../redux/posts/postsSelectors";
import productNotFound from "../../../public/productNotFound.jpeg";
import { getRole, getUser } from "../../../redux/auth/authSelectors";
import Comment from "../../Comment/Comment";
import CustomDropdown from "../../UI/CustomDropdown";
// import UpdateItemForm from "../ProductForm/UpdateProductForm";
import Link from "next/link";
import ProductVerifyView from "../ProductVerifyView";

interface ProductDetailProps {
  productId: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [comment, setComment] = useState("");
  const product = useSelector(getPost);
  const myPost = useSelector(getUser);

  const role = useSelector(getRole);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const isAccountPage = router.pathname === "/admin";

  const updateProductLink = `/product/${productId}/update`;

  useEffect(() => {
    try {
      if (typeof id === "string") {
        dispatch(getPostById(id));
      }
    } catch (e) {
      return;
    }
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      if (typeof id === "string" && product) {
        await dispatch(
          updatePostStatus({
            postId: product._id,
            credentials: { verify: newStatus },
          })
        );
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const handleCommentAdd = async () => {
    try {
      if (typeof id === "string" && product) {
        await dispatch(
          addPostComment({
            postId: product._id,
            credentials: { text: comment },
          })
        );
        setComment("");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const productPhoto = product.img || productNotFound;

  return (
    <div>
      <Image
        src={productPhoto}
        alt="product photo"
        width={150}
        height={200}
        style={{
          objectFit: "cover",
          margin: "auto",
        }}
        priority
      />
      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Views: {product.views}</p>
      <p>Location: {product.owner.location}</p>
      {(isAccountPage && role === "admin") ||
      (isAccountPage && role === "moderator") ? (
        <>
          <p>Status: {product.verify}</p>
          <CustomDropdown
            options={["Approve", "Reject"]}
            defaultOption={product.verify}
            onSelect={(option) => handleStatusChange(option.toLowerCase())}
          />
        </>
      ) : null}
      {product.owner.id === myPost._id && (
        <>
          <ProductVerifyView post={product} />{" "}
          <Link href={updateProductLink}>Update Product</Link>
        </>
      )}

      <ul>
        {product.comments?.map((item) => (
          <Comment
            key={item.id}
            comment={item}
          />
        ))}
      </ul>
      <textarea
        value={comment}
        placeholder="leave your comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="button"
        onClick={() => handleCommentAdd()}>
        Submit
      </button>
    </div>
  );
};

export default ProductDetail;
