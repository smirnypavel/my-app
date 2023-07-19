import React from "react";
import { useSelector } from "react-redux";
import { getPost } from "../../redux/posts/postsSelectors";
import styles from "../../styles/components/Product/ProductVerifyView.module.css";
import { IPosts } from "../../redux/posts/postsReducer";

interface ProductVerifyViewProps {
  item: IPosts;
}

const ProductVerifyView: React.FC<ProductVerifyViewProps> = ({ item }) => {
  let indicatorClass;
  if (item.verify === "approve") {
    indicatorClass = styles.indicatorApprove;
  } else if (item.verify === "rejected") {
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
