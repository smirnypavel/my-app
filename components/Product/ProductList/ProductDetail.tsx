import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks";
import {
  getPostById,
  updatePostStatus,
} from "../../../redux/posts/postsOperations";
import { getPost } from "../../../redux/posts/postsSelectors";
import productNotFound from "../../../public/productNotFound.jpeg";
import { getRole } from "../../../redux/auth/authSelectors";
import Comment from "../../Comment/Comment";
import CustomDropdown from "../../UI/CustomDropdown";

interface ProductDetailProps {
  productId: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const product = useSelector(getPost);
  const role = useSelector(getRole);
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
      {role === "admin" || role === "moderator" ? (
        <>
          <p>Status: {product.verify}</p>
          <CustomDropdown
            options={["Approve", "Reject"]}
            defaultOption={product.verify}
            onSelect={(option) => handleStatusChange(option.toLowerCase())}
          />
          <button onClick={() => handleStatusChange(product.verify)}>
            Save
          </button>
        </>
      ) : null}
      <ul>
        {product.comments?.map((item) => (
          <Comment
            key={item.id}
            comment={item}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;
