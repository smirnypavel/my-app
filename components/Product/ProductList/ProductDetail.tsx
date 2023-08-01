import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addPostComment,
  deletePost,
  getPostById,
  getView,
  hidePost,
  updatePostStatus,
} from "../../../redux/posts/postsOperations";
import toast from "react-hot-toast";
import { getPost } from "../../../redux/posts/postsSelectors";
import productNotFound from "../../../public/productNotFound.jpeg";
import { getRole, getUser } from "../../../redux/auth/authSelectors";
import Comment from "../../Comment/Comment";
import CustomDropdown from "../../UI/CustomDropdown";
import Link from "next/link";
import ProductVerifyView from "../ProductVerifyView";
import styles from "../../../styles/components/Product/ProductDetail.module.css";
import Modal from "../../Modal/Modal";
import ToExchangeList from "../../Account/ProductExchange/ToExchangeList";
import Button from "../../UI/Button";

interface ProductDetailProps {
  productId: string;
  productData: any; // Assuming you have a type for product data, adjust this type accordingly
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  productData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalHidePostOpen, setIsModalHidePostOpen] = useState(false);
  const [isModalDeletePostOpen, setIsModalDeletePostOpen] = useState(false);
  const [comment, setComment] = useState("");
  const product = useSelector(getPost);
  const myPost = useSelector(getUser);
  const role = useSelector(getRole);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const isAccountPage = router.pathname === "/admin";
  const updateProductLink = `/product/${productId}/update`;
  const active = product.isActive;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalHide = () => {
    setIsModalHidePostOpen(true);
  };
  const closeModalHide = () => {
    setIsModalHidePostOpen(false);
  };

  const openModalDelete = () => {
    setIsModalDeletePostOpen(true);
  };
  const closeModalDelete = () => {
    setIsModalDeletePostOpen(false);
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

  useEffect(() => {
    try {
      if (typeof id === "string") {
        dispatch(getView(id));
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
  const handleHidePost = async () => {
    try {
      if (typeof id === "string" && product) {
        await dispatch(hidePost(product._id));
        toast.success("You have successfully hide post");
        setIsModalHidePostOpen(false);
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const handleDeletePost = async () => {
    try {
      if (typeof id === "string" && product) {
        await dispatch(deletePost(product._id));
        setIsModalHidePostOpen(false);
        router.back();
        toast.success("You have successfully delete post");
        // Вернуться назад после успешного удаления
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  const handleBack = () => {
    router.back();
  };

  const productPhoto = product.img || productNotFound;
  // const productPhoto = productData.img || productNotFound;

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
                className={styles.image}
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
                </p>
              </div>
            </div>
          </div>
        </div>

        {role === "admin" || role === "moderator" ? (
          <>
            <p>Status: {product.verify}</p>
            <CustomDropdown
              options={["Approve", "Reject"]}
              defaultOption={product.verify}
              onSelect={(option) => handleStatusChange(option.toLowerCase())}
            />
          </>
        ) : null}
        <div className={styles.productDetailContainer}>
          <ul className={styles.commentWrapper}>
            {product.comments?.map((item) => (
              <Comment
                key={item.id}
                comment={item}
              />
            ))}
          </ul>
          <div className={styles.inputCommentWrapper}>
            <textarea
              value={comment}
              placeholder="leave your comment"
              onChange={(e) => setComment(e.target.value)}
              className={styles.inputComment}
            />
            <button
              className={styles.inputCommentButton}
              type="button"
              onClick={() => handleCommentAdd()}>
              Submit
            </button>
          </div>
        </div>
        {product.owner.id === myPost._id && (
          <>
            <ProductVerifyView post={product} />
            <button
              onClick={openModalHide}
              className={styles.hidePostButton}>
              {active ? "hide post" : "publish post"}
            </button>
            <button
              onClick={openModalDelete}
              className={styles.deletePostButton}>
              Delete Post
            </button>
          </>
        )}
        <button
          onClick={handleBack}
          className={styles.backButton}>
          {" <<< "} Back
        </button>
        {isModalOpen && (
          <Modal
            isOpen={true}
            onClose={() => setIsModalOpen(false)}>
            <ToExchangeList />
          </Modal>
        )}
      </div>
      {isModalHidePostOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalHidePostOpen(false)}>
          <div>
            <h3 className={styles.hidePostMassageTitle}>
              Do you want to hide the post?
            </h3>
            <div className={styles.hidePostMassageButton}>
              <Button onClick={handleHidePost}>yes</Button>
              <Button onClick={closeModalHide}>no</Button>
            </div>
          </div>
        </Modal>
      )}
      {isModalDeletePostOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalDeletePostOpen(false)}>
          <div>
            <h3 className={styles.hidePostMassageTitle}>
              Do you want to Delete the post?
            </h3>
            <div className={styles.hidePostMassageButton}>
              <Button onClick={handleDeletePost}>yes</Button>
              <Button onClick={closeModalDelete}>no</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductDetail;
