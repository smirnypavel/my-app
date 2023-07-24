import type { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import { ProductDetail } from "../../../components/Product/ProductList/ProductDetail";
import { IPosts } from "../../../redux/posts/postsReducer";

interface ItemDetailsPageProps {
  productId: string;
  productData: IPosts;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of post IDs from your API (assuming you have such an endpoint)
  const response = await axios.get("/posts");
  const posts = response.data;
  const paths = posts.map((post: any) => ({ params: { id: post._id } }));

  return {
    paths,
    fallback: true, // Set fallback to true to generate other pages on-demand
  };
};

export const getStaticProps: GetStaticProps<ItemDetailsPageProps> = async ({
  params,
}) => {
  const id = params?.id?.toString(); // Use optional chaining and toString() to ensure productId is a single string

  if (!id) {
    return {
      notFound: true, // Return notFound if id is not available
      props: {}, // Set an empty object for props when not found
    };
  }

  // Fetch the specific post data using the ID
  const response = await axios.get(`/posts/find/${id}`);
  const productData = response.data;

  return {
    props: {
      productId: id,
      productData,
    },
    revalidate: 10,
  };
};

const ItemDetailsPage: React.FC<ItemDetailsPageProps> = ({
  productId,
  productData,
}) => {
  return (
    <Layout>
      <ProductDetail
        productId={productId}
        productData={productData}
      />
    </Layout>
  );
};

export default ItemDetailsPage;
