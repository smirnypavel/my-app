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
import Link from "next/link";
import ProductVerifyView from "../ProductVerifyView";
import styles from "../../../styles/components/Product/ProductDetail.module.css";
import Modal from "../../Modal/Modal";
import UserExchangeList from "../../Account/ProductExchange/UserExchangeList";

interface ProductDetailProps {
  productId: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const product = useSelector(getPost);
  const myPost = useSelector(getUser);
  const role = useSelector(getRole);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const isAccountPage = router.pathname === "/admin";
  const updateProductLink = `/product/${productId}/update`;

  const openModal = () => {
    console.log("click");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <>
      <div className={styles.productDetailContainer}>
        <div className={styles.productDetail}>
          <div>
            <div className={styles.imageWrapper}>
              <Image
                src={productPhoto}
                alt="product photo"
                width={288}
                height={300}
                style={{
                  objectFit: "cover",
                  margin: "auto",
                }}
                priority
              />
            </div>
            {product.owner.id === myPost._id ? (
              <Link
                href={updateProductLink}
                className={styles.buttonUpdateProduct}>
                Update Product
              </Link>
            ) : (
              <button
                className={styles.buttonUpdateProduct}
                onClick={openModal}>
                Offer to exchange
              </button>
            )}
          </div>
          <div className={styles.productInfo}>
            <div>
              <ul className={styles.productInfoList}>
                <h2>{product.title}</h2>
                <li className={styles.productInfoItem}>
                  <p className={styles.productInfoItemText}>
                    Price: {product.price}
                  </p>
                </li>
                <label>Location:</label>
                <li className={styles.productInfoItem}>
                  <p className={styles.productInfoItemText}>
                    {product.owner.location}
                  </p>
                </li>
              </ul>
              <p>Views: {product.views}</p>
              <label>Description:</label>
              <div className={styles.productInfoItem}>
                <p className={styles.productInfoItemDescription}>
                  {product.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Est, earum deserunt alias nobis consequuntur
                  dolor ab nam, id esse laborum ducimus distinctio porro tenetur
                  quidem vero! Est necessitatibus et omnis. Consectetur ipsa
                  numquam vel provident quaerat esse quibusdam aut tempora hic
                  facilis quas earum velit, deleniti quam doloremque aliquid
                  quos. Nostrum nesciunt eum quibusdam qui quidem, commodi
                  laboriosam ipsa esse. Dolorem voluptas aliquam sit dolores
                  cupiditate hic, quasi ea omnis, deserunt labore perferendis,
                  sapiente officiis? Atque consectetur culpa commodi debitis
                  ullam, vel beatae, officiis et quaerat, nobis ipsum voluptates
                  placeat! At odio accusamus libero dolorem voluptatibus
                  aspernatur, beatae doloribus tempora magnam unde illum,
                  voluptate dignissimos officia perspiciatis quaerat nesciunt.
                  Porro explicabo ducimus commodi provident reprehenderit ut
                  laboriosam tempora, suscipit iusto. Saepe nesciunt, sunt
                  dolorum minima eligendi doloribus corrupti maiores iste
                  expedita quidem, animi incidunt ratione fugiat fuga. Ipsam
                  voluptas ab quae repudiandae, quod dolorum cum nulla omnis
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>

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
      {product.owner.id === myPost._id && <ProductVerifyView post={product} />}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}>
          <UserExchangeList />
        </Modal>
      )}
    </>
  );
};

export default ProductDetail;
