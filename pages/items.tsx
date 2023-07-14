import React from "react";
import Layout from "../components/Layout/Layout";
import { ItemList } from "../components/ItemList/ItemList";
import SearchBar from "../components/SearchBar/SearchBar";
import axios from "axios";
import { IPosts } from "../redux/posts/postsReducer";

interface ItemsPageProps {
  post: IPosts[];
}

const ItemsPage: React.FC<ItemsPageProps> = ({ post }) => {
  return (
    <Layout>
      <div>
        <SearchBar />
        <ItemList post={post} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    console.log("Sending request..."); // Вывод сообщения в консоль
    const response = await axios.get("/posts");
    console.log("Response received:", response.data); // Вывод ответа в консоль
    const post: IPosts[] = response.data;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log("Error:", error); // Вывод ошибки в консоль
    return {
      props: {
        post: [],
      },
    };
  }
}

export default ItemsPage;
