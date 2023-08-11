// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { IPosts } from "../../types/IPost";
// import ItemCard from "../Product/ProductList/ProductCard";
// import styles from "../../styles/components/ItemList.module.css";
// import styles2 from "../../styles/components/Moderator/moderateProduct.module.css";

// const MyFavorites: React.FC = () => {
//   const [post, setPost] = useState<IPosts[]>([]);
//   useEffect(() => {
//     const fetchFavorite = async () => {
//       try {
//         const response = await axios.get("/posts/myfav");
//         setPost(response.data);
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };
//     fetchFavorite();
//   }, []);

//   return (
//     <>
//       <div className={styles2.statContainer}>
//         <p>Список моих товаров</p>
//         <div className={styles.itemList}>
//           {post.map((item: IPosts) => (
//             <ItemCard
//               key={item._id}
//               item={item}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
// export default MyFavorites;
