import React from "react";
import { useSelector } from "react-redux";
import { getPost } from "../../redux/posts/postsSelectors";
import styles from "../../styles/components/Product/ProductVerifyView.module.css";
import { IPosts } from "../../redux/posts/postsReducer";

interface ProductVerifyViewProps {
  post: IPosts;
}

const ProductVerifyView: React.FC<ProductVerifyViewProps> = ({ post }) => {
  let indicatorClass;
  if (post.verify === "approve") {
    indicatorClass = styles.indicatorApprove;
  } else if (post.verify === "reject") {
    indicatorClass = styles.indicatorRejected;
  } else {
    // Default to "new" if the value is not "approve" or "rejected"
    indicatorClass = styles.indicatorNew;
  }

  return (
    <>
      <div>
        <div className={indicatorClass}></div>
      </div>
    </>
  );
};

export default ProductVerifyView;
