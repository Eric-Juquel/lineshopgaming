import ProductsDetails from '../../components/products/ProductDetails';

import { getProductDetails } from '../../redux/actions/productActions';

import { wrapper } from '../../redux/store';

export default function ProductsPage() {
  return <ProductsDetails />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getProductDetails(req, params.id));
    }
);
