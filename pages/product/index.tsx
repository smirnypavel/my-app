// ItemsPage.tsx
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout/Layout";
import { ItemList } from "../../components/Product/ProductList/ProductList";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IPosts } from "../../types/IPost";

interface ItemsPageProps {
  post: IPosts[];
}

const ItemsPage: React.FC<ItemsPageProps> = ({ post }) => {
  const [filteredPost, setFilteredPost] = useState<IPosts[]>(post);

  const handleSearch = async (searchTerm: string) => {
    try {
      if (searchTerm.trim() !== "") {
        // Если есть поисковый запрос, делаем запрос на поиск
        const response = await axios.get(`/posts/search?req=${searchTerm}`);
        setFilteredPost(response.data);
      } else {
        // Если нет поискового запроса, делаем запрос на все элементы
        const response = await axios.get(`/posts`);
        setFilteredPost(response.data);
      }
    } catch (error) {
      toast.error(`Nothing found for your request ${searchTerm}`);

      setFilteredPost([]); // В случае ошибки, установите пустой массив
    }
  };

  return (
    <Layout>
      <div>
        <SearchBar onSearch={handleSearch} />
        <ItemList post={filteredPost} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ItemsPageProps
> = async () => {
  try {
    // Запрос на все элементы
    const response = await axios.get(`/posts`);
    const post: IPosts[] = response.data;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log("Ошибка:", error);
    return {
      props: {
        post: [],
      },
      revalidate: 10,
    };
  }
};

export default ItemsPage;
