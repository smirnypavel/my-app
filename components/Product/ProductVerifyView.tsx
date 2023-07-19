import React from "react";
import { useSelector } from "react-redux";
import { getPost } from "../../redux/posts/postsSelectors";
import styles from "../../styles/components/Product/ProductVerifyView.module.css";

const ProductVerifyView = () => {
  const post = useSelector(getPost);

  let indicatorClass;
  if (post.verify === "approve") {
    indicatorClass = styles.indicatorApprove;
  } else if (post.verify === "rejected") {
    indicatorClass = styles.indicatorRejected;
  } else {
    // Default to "new" if the value is not "approve" or "rejected"
    indicatorClass = styles.indicatorNew;
  }

  return (
    <>
      <div>
        Status: {post.verify} <div className={indicatorClass}></div>
      </div>
    </>
  );
};

export default ProductVerifyView;
