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
import { toast } from "react-hot-toast";
import { getPost } from "../../../redux/posts/postsSelectors";
import productNotFound from "../../../public/productNotFound.jpeg";
import {
  getRole,
  getUser,
  selectIsLoggedIn,
} from "../../../redux/auth/authSelectors";
import Comment from "../../Comment/Comment";
import CustomDropdown from "../../UI/CustomDropdown";
import Link from "next/link";
import ProductVerifyView from "../ProductVerifyView";
import styles from "../../../styles/components/Product/ProductDetail.module.css";
import Modal from "../../Modal/Modal";
import ToExchangeList from "../../Account/ProductExchange/ToExchangeList";
import Button from "../../UI/Button";
import { IPosts } from "../../../types/IPost";
import { useTranslation } from "react-i18next";

interface ProductDetailProps {
  productId: string;
  productData: IPosts; // Assuming you have a type for product data, adjust this type accordingly
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  productData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalHidePostOpen, setIsModalHidePostOpen] = useState(false);
  const [isModalDeletePostOpen, setIsModalDeletePostOpen] = useState(false);
  const [IsModalImageOpen, setIsModalImageOpen] = useState(false);
  const [comment, setComment] = useState("");
  const product = useSelector(getPost);
  const IsLogin = useSelector(selectIsLoggedIn);
  const myPost = useSelector(getUser);
  const role = useSelector(getRole);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const isAccountPage = router.pathname === "/admin";
  const updateProductLink = `/product/${productId}/update`;
  const active = product.isActive;

  const openModal = () => {
    if (!IsLogin) {
      return toast.error("You need to login");
    }
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
  const openModalImage = () => {
    // Ошибка: должно быть setIsModalImageOpen, а не isModalImageOpen
    setIsModalImageOpen(true);
  };

  const closeModalImage = () => {
    // Ошибка: должно быть setIsModalImageOpen, а не setIisModalImageOpen
    setIsModalImageOpen(false);
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
    if (!IsLogin) {
      return;
    }
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
          <div className={styles.containerImg}>
            <div className={styles.imageWrapper}>
              <Image
                src={productPhoto}
                alt="product photo"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{
                  objectFit: "cover",
                  margin: "auto",
                }}
                priority
                className={styles.image}
                onClick={openModalImage}
              />
            </div>
            {product.owner.id === myPost._id ? (
              <Link
                href={updateProductLink}
                className={styles.buttonUpdateProduct}>
                {t("productDetail.updateButton")}
              </Link>
            ) : (
              <button
                className={styles.buttonUpdateProduct}
                onClick={openModal}>
                {t("productDetail.offerTo")}
              </button>
            )}
          </div>
          <div className={styles.productInfo}>
            <div>
              <ul className={styles.productInfoList}>
                <h2>{product.title}</h2>
                <li className={styles.productInfoItem}>
                  <p className={styles.productInfoItemText}>
                    {t("productDetail.price")}: {product.price}
                  </p>
                </li>
                <label>{t("productDetail.location")}:</label>
                <li className={styles.productInfoItem}>
                  <p className={styles.productInfoItemText}>
                    {product.location}
                  </p>
                </li>
              </ul>
              <p>
                {t("productDetail.views")}: {product.views}
              </p>
              <label>{t("productDetail.description")}</label>
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
          {IsLogin ? (
            <div className={styles.inputCommentWrapper}>
              <textarea
                value={comment}
                placeholder={t("productDetail.comment")}
                onChange={(e) => setComment(e.target.value)}
                className={styles.inputComment}
              />
              <button
                className={styles.inputCommentButton}
                type="button"
                onClick={() => handleCommentAdd()}>
                {t("productDetail.submitComment")}
              </button>
            </div>
          ) : (
            <p className={styles.commentMessage}>
              You need to login to post comments
            </p>
          )}
        </div>
        {product.owner.id === myPost._id && (
          <>
            <ProductVerifyView post={product} />
            <button
              onClick={openModalHide}
              className={styles.hidePostButton}>
              {active ? t("productDetail.hide") : t("productDetail.publish")}
            </button>
            <button
              onClick={openModalDelete}
              className={styles.deletePostButton}>
              {t("productDetail.delete")}
            </button>
          </>
        )}
        <button
          onClick={handleBack}
          className={styles.backButton}>
          {" <<< "} {t("productDetail.backButton")}
        </button>
        {isModalOpen && (
          <Modal
            isOpen={true}
            onClose={() => setIsModalOpen(false)}>
            <ToExchangeList product={product} />
          </Modal>
        )}
      </div>
      {isModalHidePostOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalHidePostOpen(false)}>
          <div>
            <h3 className={styles.hidePostMassageTitle}>
              {t("productDetail.hideQ")}
            </h3>
            <div className={styles.hidePostMassageButton}>
              <Button onClick={handleHidePost}>{t("productDetail.yes")}</Button>
              <Button onClick={closeModalHide}>{t("productDetail.no")}</Button>
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
              {t("productDetail.deleteQ")}
            </h3>
            <div className={styles.hidePostMassageButton}>
              <Button onClick={handleDeletePost}>
                {t("productDetail.yes")}
              </Button>
              <Button onClick={closeModalDelete}>
                {t("productDetail.no")}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {IsModalImageOpen && (
        <Modal
          isOpen={true}
          onClose={() => closeModalImage()}>
          <div className={styles.openImage}>
            <Image
              src={productPhoto}
              alt="product photo"
              width="500"
              height="500"
              style={{
                objectFit: "cover",
                margin: "auto",
              }}
              priority
              className={styles.image}
              onClick={closeModalImage}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductDetail;
