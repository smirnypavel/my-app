import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPosts } from "../../../types/IPost";
import ItemCard from "../../../components/Product/ProductList/ProductCard";
import styles from "../../../styles/components/ItemList.module.css";
import styles2 from "../../../styles/components/Moderator/moderateProduct.module.css";
import Layout from "../../../components/Layout/Layout";
import PrivateRoute from "../../../redux/PrivateRoute";
import AccountPage from "../../../components/Account/AcountPage";

const MyFavorites = () => {
  const [post, setPost] = useState<IPosts[]>([]);
  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await axios.get("/posts/myfav");
        setPost(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchFavorite();
  }, []);

  return (
    <PrivateRoute>
      <Layout>
        <AccountPage>
          <div className={styles.itemListContainer}>
            <p>Favorites LIST</p>
            <div className={styles.itemList}>
              {post.map((item: IPosts) => (
                <ItemCard
                  key={item._id}
                  item={item}
                />
              ))}
            </div>
          </div>
          {/* <MyFavorites /> */}
        </AccountPage>
      </Layout>
    </PrivateRoute>
  );
};
export default MyFavorites;
