import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks";
import {
  getPostById,
  getView,
  updatePostStatus,
} from "../../../redux/posts/postsOperations";
import { getPost } from "../../../redux/posts/postsSelectors";
import productNotFound from "../../../public/productNotFound.jpeg";
import { getRole } from "../../../redux/auth/authSelectors";
import { IPosts } from "../../../redux/posts/postsReducer";

interface ProductDetailProps {
  productId: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const product = useSelector(getPost);
  const role = useSelector(getRole);
  const [statusNew, setStatusNew] = useState<boolean>(
    product?.verify === "new"
  );
  const [statusApprove, setStatusApprove] = useState<boolean>(
    product?.verify === "approve"
  );
  const [statusReject, setStatusReject] = useState<boolean>(
    product?.verify === "reject"
  );
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (typeof id === "string") {
        dispatch(getPostById(id));
      }
    } catch (e) {
      return;
    }
  }, [id]);

  const handleStatusChange = async () => {
    try {
      if (typeof id === "string" && product) {
        let newStatus = "";
        if (statusNew) {
          newStatus = "new";
        } else if (statusApprove) {
          newStatus = "approve";
        } else if (statusReject) {
          newStatus = "reject";
        }

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

  const productPhoto = product.img || productNotFound; // Используйте productNotFound, если avatarURL не определен

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
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Views: {product.views}</p>
      <p>Location: {product.owner.location}</p>
      {role === "admin" || role === "moderator" ? (
        <>
          <p>Status: {product.verify}</p>
          <label>
            <input
              type="checkbox"
              checked={statusNew}
              onChange={() => setStatusNew(!statusNew)}
            />
            New
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusApprove}
              onChange={() => setStatusApprove(!statusApprove)}
            />
            Approve
          </label>
          <label>
            <input
              type="checkbox"
              checked={statusReject}
              onChange={() => setStatusReject(!statusReject)}
            />
            Reject
          </label>
          <button onClick={handleStatusChange}>Save</button>
        </>
      ) : null}
    </div>
  );
};
