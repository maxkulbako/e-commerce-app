import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { useParams } from "react-router";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber: pageNumber || 1,
    keyword: keyword || "",
  });

  return (
    <>
      {!keyword && <ProductCarousel />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomePage;
