import { useRouter } from "next/router";
import Layout from "../../../components/Layout/Layout";
import UpdateProductForm from "../../../components/Product/ProductForm/UpdateProductForm";

const UpdateProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const productId = Array.isArray(id) ? id[0] : id;

  // Рендер компонента UpdateProductForm с передачей идентификатора продукта (productId)
  return (
    <Layout>
      <h1>Update Product</h1>
      {productId && <UpdateProductForm productId={productId} />}
    </Layout>
  );
};

export default UpdateProductPage;
